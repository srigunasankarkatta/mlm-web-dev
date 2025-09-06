import React, { useState, useEffect, useRef } from "react";
import { Tree } from "react-d3-tree";
import { ChevronDown, ChevronRight, DollarSign, Users } from "lucide-react";
import styles from "./MLMTree.module.scss";

interface TreeNode {
  name: string;
  role: string;
  earnings: number;
  teamSize: number;
  children?: TreeNode[];
}

interface MLMTreeProps {
  className?: string;
}

const MLMTree: React.FC<MLMTreeProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Generate random number of children (1-3)
  const getRandomChildrenCount = () => Math.floor(Math.random() * 3) + 1;

  // Generate random earnings (800-2000)
  const getRandomEarnings = () => Math.floor(Math.random() * 1200) + 800;

  // Generate random team size (5-25)
  const getRandomTeamSize = () => Math.floor(Math.random() * 20) + 5;

  // Function to calculate total team size recursively
  const calculateTeamSize = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) {
      return 1; // The node itself
    }
    return (
      1 +
      node.children.reduce((sum, child) => sum + calculateTeamSize(child), 0)
    );
  };

  // Generate the tree data with random children
  const generateTreeData = (): TreeNode => {
    const children = [
      {
        name: "B1",
        role: "Regional Manager",
        earnings: 8750,
        teamSize: 0, // Will be calculated
        children: Array.from({ length: getRandomChildrenCount() }, (_, i) => ({
          name: `C${i + 1}`,
          role: "Team Lead",
          earnings: getRandomEarnings(),
          teamSize: getRandomTeamSize(),
        })),
      },
      {
        name: "B2",
        role: "Regional Manager",
        earnings: 9200,
        teamSize: 0, // Will be calculated
        children: Array.from({ length: 2 }, (_, i) => ({
          name: `C${i + 3}`,
          role: "Team Lead",
          earnings: getRandomEarnings(),
          teamSize: getRandomTeamSize(),
        })),
      },
      {
        name: "B3",
        role: "Regional Manager",
        earnings: 7800,
        teamSize: 0, // Will be calculated
        children: Array.from({ length: getRandomChildrenCount() }, (_, i) => ({
          name: `C${i + 6}`,
          role: "Team Lead",
          earnings: getRandomEarnings(),
          teamSize: getRandomTeamSize(),
        })),
      },
      {
        name: "B4",
        role: "Regional Manager",
        earnings: 6500,
        teamSize: 0, // Will be calculated
        children: Array.from({ length: getRandomChildrenCount() }, (_, i) => ({
          name: `C${i + 9}`,
          role: "Team Lead",
          earnings: getRandomEarnings(),
          teamSize: getRandomTeamSize(),
        })),
      },
    ];

    // Calculate team sizes for each child
    children.forEach((child) => {
      child.teamSize = calculateTeamSize(child) - 1; // Subtract 1 to exclude the child itself
    });

    const treeData: TreeNode = {
      name: "A",
      role: "Chief Executive",
      earnings: 15420,
      teamSize: 0, // Will be calculated
      children,
    };

    // Calculate total team size
    treeData.teamSize = calculateTeamSize(treeData) - 1; // Subtract 1 to exclude A itself

    return treeData;
  };

  // Generate the tree data
  const treeData = generateTreeData();

  // Filter data based on expansion state
  const getFilteredData = (data: TreeNode, level: number = 0): TreeNode => {
    if (!isExpanded && level >= 2) {
      return { ...data, children: undefined };
    }

    if (data.children) {
      return {
        ...data,
        children: data.children.map((child) =>
          getFilteredData(child, level + 1)
        ),
      };
    }

    return data;
  };

  const filteredData = getFilteredData(treeData);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } =
          treeContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Auto-expand after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isManager =
      nodeDatum.role === "Chief Executive" ||
      nodeDatum.role === "Regional Manager";
    const isTeamLead = nodeDatum.role === "Team Lead";

    return (
      <g>
        {/* Node circle */}
        <circle
          r={isManager ? 30 : isTeamLead ? 24 : 18}
          fill={isManager ? "#198c64" : isTeamLead ? "#47a383" : "#75baa2"}
          stroke="#fff"
          strokeWidth="2.5"
          className={styles.nodeCircle}
        />

        {/* Node content */}
        <text
          textAnchor="middle"
          dy=".35em"
          x="0"
          y="0"
          fill="white"
          fontSize={isManager ? "12" : isTeamLead ? "10" : "8"}
          fontWeight="600"
          className={styles.nodeText}
        >
          {nodeDatum.name.split(" ")[0]}
        </text>

        {/* Earnings label for managers */}
        {isManager && (
          <g transform="translate(0, 40)">
            <rect
              x="-35"
              y="-8"
              width="70"
              height="16"
              rx="8"
              fill="rgba(25, 140, 100, 0.9)"
              className={styles.earningsLabel}
            />
            <text
              textAnchor="middle"
              dy=".35em"
              x="0"
              y="0"
              fill="white"
              fontSize="8"
              fontWeight="600"
              className={styles.earningsText}
            >
              ${nodeDatum.earnings.toLocaleString()}
            </text>
          </g>
        )}

        {/* Team size label for team leads */}
        {isTeamLead && (
          <g transform="translate(0, 35)">
            <rect
              x="-30"
              y="-6"
              width="60"
              height="12"
              rx="6"
              fill="rgba(71, 163, 131, 0.9)"
              className={styles.teamLabel}
            />
            <text
              textAnchor="middle"
              dy=".35em"
              x="0"
              y="0"
              fill="white"
              fontSize="7"
              fontWeight="600"
              className={styles.teamText}
            >
              {nodeDatum.teamSize} members
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div className={`${styles.mlmTreeContainer} ${className || ""}`}>
      <div className={styles.treeWrapper} ref={treeContainerRef}>
        {dimensions.width > 0 && (
          <Tree
            data={filteredData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2, y: dimensions.height / 6 }}
            pathFunc="step"
            pathClassFunc={() => styles.treeLink}
            nodeSize={{ x: 180, y: 100 }}
            separation={{ siblings: 0.8, nonSiblings: 1.0 }}
            transitionDuration={800}
            renderCustomNodeElement={renderCustomNode}
            zoom={1.2}
            scaleExtent={{ min: 0.8, max: 1.8 }}
            enableLegacyTransitions={true}
          />
        )}
      </div>
    </div>
  );
};

export default MLMTree;
