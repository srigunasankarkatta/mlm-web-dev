import React, { useState, useMemo, useEffect } from "react";
import Tree from "react-d3-tree";
import { useUserTeamTree } from "../hooks/useProfile";
import { TeamTreeNode } from "../api-services/profile-service";
import styles from "./NetworkTree.module.scss";

// Custom diagonal path function with enhanced curves
const diagonalPath = (linkData: any) => {
  const { source, target } = linkData;
  const sourceX = source.x;
  const sourceY = source.y;
  const targetX = target.x;
  const targetY = target.y;

  // Calculate the distance and angle for better curve control
  const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Create control points for a smooth diagonal curve
  const controlPoint1X = sourceX + deltaX * 0.3;
  const controlPoint1Y = sourceY + deltaY * 0.7;
  const controlPoint2X = sourceX + deltaX * 0.7;
  const controlPoint2Y = sourceY + deltaY * 0.3;

  // Create a smooth diagonal path with two control points for better curves
  const path = `M${sourceX},${sourceY}C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${targetX},${targetY}`;

  return path;
};

interface NetworkNode {
  name: string;
  attributes?: {
    id?: number;
    email?: string;
    referral_code?: string;
    package?: string;
    level?: number;
    status?: "active" | "inactive";
  };
  children?: NetworkNode[];
}

interface NetworkTreeProps {
  userId?: string;
  maxDepth?: number;
}

const NetworkTree: React.FC<NetworkTreeProps> = ({ userId, maxDepth = 3 }) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [treeTranslate, setTreeTranslate] = useState({ x: 400, y: 100 });

  // Use the React Query hook to fetch team tree data
  const {
    data: teamTreeResponse,
    isLoading: loading,
    error,
  } = useUserTeamTree();

  // Calculate center position for tree
  useEffect(() => {
    const updateTreePosition = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const centerX = Math.max(containerWidth / 2, 400);
      const centerY = Math.max(containerHeight / 4, 150);
      setTreeTranslate({ x: centerX, y: centerY });
    };

    updateTreePosition();
    window.addEventListener("resize", updateTreePosition);

    return () => window.removeEventListener("resize", updateTreePosition);
  }, []);

  // Transform API data to react-d3-tree format
  const treeData = useMemo(() => {
    if (!teamTreeResponse?.data) return [];

    const transformNode = (node: TeamTreeNode): NetworkNode => {
      const transformedNode = {
        name: node.name,
        attributes: {
          id: node.id,
          email: node.email,
          referral_code: node.referral_code || "N/A",
          package: node.package || "No Package",
          level: node.level,
          status: "active", // Default to active since API doesn't provide status
        },
        children: node.children?.map(transformNode) || [],
      };

      // Debug logging
      console.log(`Transforming node: ${node.name} (ID: ${node.id})`, {
        originalChildren: node.children,
        transformedChildren: transformedNode.children,
        hasChildren: node.children && node.children.length > 0,
      });

      return transformedNode;
    };

    const result = [transformNode(teamTreeResponse.data)];
    console.log("Final tree data:", result);
    return result;
  }, [teamTreeResponse]);

  const handleNodeClick = (nodeData: any) => {
    setSelectedNode(nodeData);
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isActive = nodeDatum.attributes?.status === "active";
    const isCurrentUser = nodeDatum.attributes?.level === 1; // Root user is level 1
    const level = nodeDatum.attributes?.level || 1;

    const nodeRadius = isCurrentUser ? 35 : 28;

    // Determine node color based on level using color palette
    let nodeColor;
    if (isCurrentUser) {
      nodeColor = "url(#currentUserGradient)"; // Dark blue for current user
    } else if (!isActive) {
      nodeColor = "url(#inactiveGradient)"; // Red for inactive
    } else {
      // Use different colors based on level
      switch (level) {
        case 2:
          nodeColor = "url(#level2Gradient)"; // Teal for level 2
          break;
        case 3:
          nodeColor = "url(#level3Gradient)"; // Light blue for level 3
          break;
        case 4:
          nodeColor = "url(#level4Gradient)"; // Very light blue for level 4
          break;
        default:
          nodeColor = "url(#activeGradient)"; // Default blue for other levels
      }
    }

    return (
      <g>
        {/* Filter definitions */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          r={nodeRadius + 4}
          fill="none"
          stroke={isCurrentUser ? "#3b82f6" : isActive ? "#10b981" : "#ef4444"}
          strokeWidth={1}
          opacity={0.3}
          filter="url(#glow)"
        />

        {/* Main node circle */}
        <circle
          r={nodeRadius}
          fill={nodeColor}
          stroke="white"
          strokeWidth={3}
          onClick={toggleNode}
          style={{ cursor: "pointer" }}
          filter="url(#glow)"
        />

        {/* Inner highlight */}
        <circle
          r={nodeRadius - 6}
          fill="rgba(255, 255, 255, 0.2)"
          stroke="none"
        />

        {/* Node icon/avatar */}
        <text
          textAnchor="middle"
          y={isCurrentUser ? 12 : 10}
          style={{
            fontSize: isCurrentUser ? "18px" : "16px",
            fontWeight: "bold",
            fill: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {nodeDatum.name.charAt(0).toUpperCase()}
        </text>

        {/* Node name */}
        <text
          textAnchor="middle"
          y={isCurrentUser ? 55 : 50}
          style={{
            fontSize: isCurrentUser ? "16px" : "14px",
            fontWeight: isCurrentUser ? "bold" : "600",
            fill: "#1f2937",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          {nodeDatum.name}
        </text>

        {/* Level badge */}
        {nodeDatum.attributes?.level && (
          <g>
            <rect
              x={-25}
              y={isCurrentUser ? 60 : 55}
              width={50}
              height={20}
              rx={10}
              fill="rgba(255, 255, 255, 0.9)"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              y={isCurrentUser ? 73 : 68}
              style={{
                fontSize: "11px",
                fontWeight: "600",
                fill: "#374151",
              }}
            >
              L{nodeDatum.attributes.level}
            </text>
          </g>
        )}

        {/* Children indicator */}
        {nodeDatum.children && nodeDatum.children.length > 0 && (
          <g>
            <circle
              cx={nodeRadius - 8}
              cy={-nodeRadius + 8}
              r={8}
              fill="rgba(255, 255, 255, 0.95)"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              x={nodeRadius - 8}
              y={-nodeRadius + 11}
              style={{
                fontSize: "9px",
                fontWeight: "bold",
                fill: "#3b82f6",
              }}
            >
              {nodeDatum.children.length}
            </text>
          </g>
        )}

        {/* Earnings indicator */}
        {nodeDatum.attributes?.earnings && (
          <g>
            <circle
              cx={nodeRadius - 8}
              cy={-nodeRadius + 8}
              r={10}
              fill="rgba(255, 255, 255, 0.95)"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              x={nodeRadius - 8}
              y={-nodeRadius + 12}
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                fill: "#059669",
              }}
            >
              $
            </text>
          </g>
        )}
      </g>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading network tree...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : "Failed to load network data"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.networkTreeContainer}>
      {/* Global gradient definitions */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient
            id="currentUserGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0b2b52" />
            <stop offset="100%" stopColor="#0e3f7a" />
          </linearGradient>
          <linearGradient
            id="activeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1256a8" />
            <stop offset="100%" stopColor="#1677d6" />
          </linearGradient>
          <linearGradient
            id="inactiveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient
            id="level2Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e90ff" />
            <stop offset="100%" stopColor="#4daaff" />
          </linearGradient>
          <linearGradient
            id="level3Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#99cfff" />
            <stop offset="100%" stopColor="#cfe0ff" />
          </linearGradient>
          <linearGradient
            id="level4Gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#cfe0ff" />
            <stop offset="100%" stopColor="#e6f0ff" />
          </linearGradient>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(11, 43, 82, 0.8)" />
            <stop offset="50%" stopColor="rgba(30, 144, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(77, 170, 255, 0.6)" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.treeHeader}>
        <div>
          <h2 className={styles.treeTitle}>Your Network Tree</h2>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Explore your MLM network hierarchy and member performance
          </p>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.currentUser}`}></div>
            <span>You (Level 1)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.level2}`}></div>
            <span>Level 2</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.level3}`}></div>
            <span>Level 3</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.level4}`}></div>
            <span>Level 4+</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.inactive}`}></div>
            <span>Inactive</span>
          </div>
        </div>
      </div>

      <div className={styles.treeWrapper}>
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc={diagonalPath}
          nodeSize={{ x: 120, y: 80 }}
          separation={{ siblings: 1.0, nonSiblings: 1.5 }}
          translate={treeTranslate}
          scaleExtent={{ min: 0.3, max: 2.5 }}
          initialDepth={maxDepth}
          renderCustomNodeElement={renderCustomNode}
          onNodeClick={handleNodeClick}
          zoomable={true}
          draggable={true}
          shouldCollapseNeighborNodes={false}
          enableLegacyTransitions={true}
          depthFactor={150}
          collapsible={true}
          transitionDuration={300}
        />

        {/* Floating controls */}
        <div className={styles.floatingControls}>
          <div className={styles.controlGroup}>
            <button
              className={styles.controlButton}
              onClick={() => {
                // Expand all nodes by clicking on them
                const nodes = document.querySelectorAll(".rd3t-node");
                nodes.forEach((node: any) => {
                  if (
                    node.__data__ &&
                    node.__data__.children &&
                    node.__data__.children.length > 0
                  ) {
                    // Simulate click to expand
                    const clickEvent = new MouseEvent("click", {
                      bubbles: true,
                    });
                    node.dispatchEvent(clickEvent);
                  }
                });
              }}
              title="Expand All Nodes"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>

            <button
              className={styles.controlButton}
              onClick={() => {
                // Reset zoom and position
                const svg = document.querySelector(".rd3t-svg");
                if (svg) {
                  svg.style.transform = `translate(${treeTranslate.x}px, ${treeTranslate.y}px) scale(1.2)`;
                }
              }}
              title="Reset View"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>

            <button
              className={styles.controlButton}
              onClick={() => {
                // Fit to screen
                const svg = document.querySelector(".rd3t-svg");
                if (svg) {
                  svg.style.transform = `translate(${treeTranslate.x}px, ${treeTranslate.y}px) scale(1.0)`;
                }
              }}
              title="Fit to Screen"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>

          <div className={styles.zoomControls}>
            <button
              className={styles.zoomButton}
              onClick={() => {
                const svg = document.querySelector(".rd3t-svg") as HTMLElement;
                if (svg) {
                  const currentTransform = svg.style.transform;
                  const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
                  const currentScale = scaleMatch
                    ? parseFloat(scaleMatch[1])
                    : 1;
                  const newScale = Math.min(currentScale * 1.2, 2.5);
                  svg.style.transform = currentTransform.replace(
                    /scale\([^)]+\)/,
                    `scale(${newScale})`
                  );
                }
              }}
              title="Zoom In"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>

            <button
              className={styles.zoomButton}
              onClick={() => {
                const svg = document.querySelector(".rd3t-svg") as HTMLElement;
                if (svg) {
                  const currentTransform = svg.style.transform;
                  const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
                  const currentScale = scaleMatch
                    ? parseFloat(scaleMatch[1])
                    : 1;
                  const newScale = Math.max(currentScale / 1.2, 0.3);
                  svg.style.transform = currentTransform.replace(
                    /scale\([^)]+\)/,
                    `scale(${newScale})`
                  );
                }
              }}
              title="Zoom Out"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className={styles.nodeDetails}>
          <h3>Member Details</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>Name:</strong> {selectedNode.name}
            </div>
            {selectedNode.attributes?.email && (
              <div className={styles.detailItem}>
                <strong>Email:</strong> {selectedNode.attributes.email}
              </div>
            )}
            {selectedNode.attributes?.referral_code && (
              <div className={styles.detailItem}>
                <strong>Referral Code:</strong>{" "}
                {selectedNode.attributes.referral_code}
              </div>
            )}
            {selectedNode.attributes?.package && (
              <div className={styles.detailItem}>
                <strong>Package:</strong> {selectedNode.attributes.package}
              </div>
            )}
            {selectedNode.attributes?.level && (
              <div className={styles.detailItem}>
                <strong>Level:</strong> {selectedNode.attributes.level}
              </div>
            )}
            {selectedNode.attributes?.status && (
              <div className={styles.detailItem}>
                <strong>Status:</strong>
                <span
                  className={`${styles.status} ${
                    styles[selectedNode.attributes.status]
                  }`}
                >
                  {selectedNode.attributes.status}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NetworkTree;
