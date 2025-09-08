import React, { useEffect, useRef, useState } from "react";
import { Tree } from "react-d3-tree";
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const getRandomChildrenCount = () => Math.floor(Math.random() * 3) + 1; // 1-3
  const getRandomEarnings = () => Math.floor(Math.random() * 1200) + 800;

  const calculateTeamSize = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + node.children.reduce((sum, c) => sum + calculateTeamSize(c), 0);
  };

  // Generate a 3-level tree: root (level 0) -> regional managers (level 1) -> team leads (level 2)
  const generateTreeData = (): TreeNode => {
    const MAX_LEVEL = 2; // 0,1,2 => three levels

    const createNode = (
      name: string,
      role: string,
      earnings: number,
      level: number
    ): TreeNode => {
      const children =
        level < MAX_LEVEL
          ? Array.from({ length: getRandomChildrenCount() }, (_, i) => {
              // decide child naming & role based on next level
              const childLevel = level + 1;
              const childName =
                childLevel === 1 ? `B${i + 1}` : `C${i + 1}`; // level1 B, level2 C
              const childRole =
                childLevel === 1 ? "Regional Manager" : "Team Lead";
              const childEarnings =
                childLevel === 1
                  ? getRandomEarnings() + 5000
                  : getRandomEarnings() + 2000;

              return createNode(childName, childRole, childEarnings, childLevel);
            })
          : [];

      const node: TreeNode = {
        name,
        role,
        earnings,
        teamSize: 0,
        children: children.length > 0 ? children : undefined,
      };

      return node;
    };

    // root with 4 regional managers
    const regionalManagers = Array.from({ length: 4 }, (_, i) =>
      createNode(
        `B${i + 1}`,
        "Regional Manager",
        getRandomEarnings() + 5000,
        1
      )
    );

    // set team size for regional managers
    regionalManagers.forEach((m) => {
      m.teamSize = calculateTeamSize(m) - 1;
    });

    const treeData: TreeNode = {
      name: "A",
      role: "Chief Executive",
      earnings: 15420,
      teamSize: 0,
      children: regionalManagers,
    };

    treeData.teamSize = calculateTeamSize(treeData) - 1;

    return treeData;
  };

  const treeData = generateTreeData();

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } = treeContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Custom diagonal cubic Bezier path for horizontal orientation
  const customDiagonalPath = (linkDatum: any) => {
    const source = linkDatum.source;
    const target = linkDatum.target;

    const sourceX = source.x;
    const sourceY = source.y;
    const targetX = target.x;
    const targetY = target.y;

    const midY = (sourceY + targetY) / 2;

    // note: react-d3-tree horizontal uses (y = horizontal, x = vertical)
    return `M ${sourceY} ${sourceX}
            C ${midY} ${sourceX}
              ${midY} ${targetX}
              ${targetY} ${targetX}`;
  };

  const renderCustomNode = ({ nodeDatum }: any) => {
    const isCEO = nodeDatum.role === "Chief Executive";
    const isManager = nodeDatum.role === "Regional Manager";
    const isTeamLead = nodeDatum.role === "Team Lead";
    const isMember = nodeDatum.role === "Member";
    const isSupervisor = nodeDatum.role === "Supervisor";
    const isCoordinator = nodeDatum.role === "Coordinator";

    const nodeRadius = isCEO
      ? 30
      : isManager
      ? 25
      : isTeamLead
      ? 20
      : isSupervisor
      ? 18
      : isCoordinator
      ? 16
      : 14;

    const textY = isCEO
      ? 50
      : isManager
      ? 45
      : isTeamLead
      ? 40
      : isSupervisor
      ? 38
      : isCoordinator
      ? 36
      : 34;

    const fontSize = isCEO
      ? "16"
      : isManager
      ? "14"
      : isTeamLead
      ? "12"
      : isSupervisor
      ? "11"
      : isCoordinator
      ? "10"
      : "9";

    const displayRole = isCEO
      ? "CEO"
      : isManager
      ? "Manager"
      : isTeamLead
      ? "Team Lead"
      : isSupervisor
      ? "Supervisor"
      : isCoordinator
      ? "Coordinator"
      : "Member";

    return (
      <g>
        <circle
          r={nodeRadius}
          fill="#1f2937"
          stroke="none"
          className={styles.nodeCircle}
        />

        <text
          textAnchor="middle"
          x="0"
          y={textY}
          fill="#1f2937"
          fontSize={fontSize}
          fontWeight="400"
          className={styles.nodeText}
        >
          {displayRole}
        </text>

        {isCEO && (
          <g transform="translate(0, 65)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="10"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: Executive
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="15"
              fill="#6b7280"
              fontSize="10"
              fontWeight="300"
              className={styles.detailText}
            >
              Earnings: ${nodeDatum.earnings?.toLocaleString?.() ?? ""}
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="30"
              fill="#6b7280"
              fontSize="10"
              fontWeight="300"
              className={styles.detailText}
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isManager && (
          <g transform="translate(0, 60)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="9"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: Regional
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="12"
              fill="#6b7280"
              fontSize="9"
              fontWeight="300"
              className={styles.detailText}
            >
              Earnings: ${nodeDatum.earnings?.toLocaleString?.() ?? ""}
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="24"
              fill="#6b7280"
              fontSize="9"
              fontWeight="300"
              className={styles.detailText}
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isTeamLead && (
          <g transform="translate(0, 55)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="8"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: Operations
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="10"
              fill="#6b7280"
              fontSize="8"
              fontWeight="300"
              className={styles.detailText}
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="20"
              fill="#6b7280"
              fontSize="8"
              fontWeight="300"
              className={styles.detailText}
            >
              Weekly Hours: 40
            </text>
          </g>
        )}

        {isSupervisor && (
          <g transform="translate(0, 50)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="7"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: Field
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="9"
              fill="#6b7280"
              fontSize="7"
              fontWeight="300"
              className={styles.detailText}
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isCoordinator && (
          <g transform="translate(0, 45)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="7"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: Support
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="9"
              fill="#6b7280"
              fontSize="7"
              fontWeight="300"
              className={styles.detailText}
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isMember && (
          <g transform="translate(0, 40)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#6b7280"
              fontSize="6"
              fontWeight="300"
              className={styles.detailText}
            >
              Department: General
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
            data={treeData}
            orientation="horizontal"
            translate={{ x: 100, y: dimensions.height / 2 }}
            pathFunc={customDiagonalPath}
            pathClassFunc={() => styles.treeLink}
            nodeSize={{ x: 150, y: 100 }}
            separation={{ siblings: 1.8, nonSiblings: 2.5 }}
            transitionDuration={600}
            renderCustomNodeElement={renderCustomNode}
            zoom={0.6}
            scaleExtent={{ min: 0.3, max: 1.0 }}
            enableLegacyTransitions={true}
          />
        )}
      </div>
    </div>
  );
};

export default MLMTree;
