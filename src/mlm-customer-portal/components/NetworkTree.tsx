import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { CustomerAuthService } from "../api-services/auth-service";
import styles from "./NetworkTree.module.scss";

interface NetworkNode {
  name: string;
  attributes?: {
    email?: string;
    joinDate?: string;
    level?: number;
    earnings?: number;
    status?: "active" | "inactive";
  };
  children?: NetworkNode[];
}

interface NetworkTreeProps {
  userId?: string;
  maxDepth?: number;
}

const NetworkTree: React.FC<NetworkTreeProps> = ({ userId, maxDepth = 3 }) => {
  const [treeData, setTreeData] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  // Mock data for demonstration - replace with actual API call
  const generateMockNetworkData = (): NetworkNode[] => {
    const currentUser = CustomerAuthService.getCurrentUser();

    return [
      {
        name: currentUser?.name || "You",
        attributes: {
          email: currentUser?.email || "your@email.com",
          joinDate: "2024-01-15",
          level: 1,
          earnings: 1250.5,
          status: "active",
        },
        children: [
          {
            name: "John Smith",
            attributes: {
              email: "john@example.com",
              joinDate: "2024-02-01",
              level: 2,
              earnings: 850.25,
              status: "active",
            },
            children: [
              {
                name: "Alice Johnson",
                attributes: {
                  email: "alice@example.com",
                  joinDate: "2024-02-15",
                  level: 3,
                  earnings: 420.75,
                  status: "active",
                },
                children: [
                  {
                    name: "Bob Wilson",
                    attributes: {
                      email: "bob@example.com",
                      joinDate: "2024-03-01",
                      level: 4,
                      earnings: 180.0,
                      status: "active",
                    },
                  },
                  {
                    name: "Carol Davis",
                    attributes: {
                      email: "carol@example.com",
                      joinDate: "2024-03-05",
                      level: 4,
                      earnings: 95.5,
                      status: "inactive",
                    },
                  },
                ],
              },
              {
                name: "David Brown",
                attributes: {
                  email: "david@example.com",
                  joinDate: "2024-02-20",
                  level: 3,
                  earnings: 320.0,
                  status: "active",
                },
                children: [
                  {
                    name: "Eva Martinez",
                    attributes: {
                      email: "eva@example.com",
                      joinDate: "2024-03-10",
                      level: 4,
                      earnings: 150.25,
                      status: "active",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Sarah Wilson",
            attributes: {
              email: "sarah@example.com",
              joinDate: "2024-02-05",
              level: 2,
              earnings: 680.75,
              status: "active",
            },
            children: [
              {
                name: "Mike Johnson",
                attributes: {
                  email: "mike@example.com",
                  joinDate: "2024-02-25",
                  level: 3,
                  earnings: 280.5,
                  status: "active",
                },
              },
              {
                name: "Lisa Anderson",
                attributes: {
                  email: "lisa@example.com",
                  joinDate: "2024-03-01",
                  level: 3,
                  earnings: 195.25,
                  status: "active",
                },
              },
            ],
          },
          {
            name: "Tom Davis",
            attributes: {
              email: "tom@example.com",
              joinDate: "2024-02-10",
              level: 2,
              earnings: 450.0,
              status: "inactive",
            },
          },
        ],
      },
    ];
  };

  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API call
        // const response = await CustomerAuthService.getNetworkTree(userId);
        // setTreeData(response.data);

        // For now, use mock data
        const mockData = generateMockNetworkData();
        setTreeData(mockData);
      } catch (err) {
        setError("Failed to load network data");
        console.error("Network tree error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNetworkData();
  }, [userId]);

  const handleNodeClick = (nodeData: any) => {
    setSelectedNode(nodeData);
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isActive = nodeDatum.attributes?.status === "active";
    const isCurrentUser =
      nodeDatum.name === (CustomerAuthService.getCurrentUser()?.name || "You");

    const nodeRadius = isCurrentUser ? 25 : 18;
    const nodeColor = isCurrentUser
      ? "url(#currentUserGradient)"
      : isActive
      ? "url(#activeGradient)"
      : "url(#inactiveGradient)";

    return (
      <g>
        {/* Gradient definitions */}
        <defs>
          <linearGradient
            id="currentUserGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient
            id="activeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
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
          y={isCurrentUser ? 8 : 6}
          style={{
            fontSize: isCurrentUser ? "14px" : "12px",
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
          y={isCurrentUser ? 45 : 40}
          style={{
            fontSize: isCurrentUser ? "13px" : "11px",
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
              x={-20}
              y={isCurrentUser ? 50 : 45}
              width={40}
              height={16}
              rx={8}
              fill="rgba(255, 255, 255, 0.9)"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              y={isCurrentUser ? 61 : 56}
              style={{
                fontSize: "9px",
                fontWeight: "600",
                fill: "#374151",
              }}
            >
              L{nodeDatum.attributes.level}
            </text>
          </g>
        )}

        {/* Earnings indicator */}
        {nodeDatum.attributes?.earnings && (
          <g>
            <circle
              cx={nodeRadius - 5}
              cy={-nodeRadius + 5}
              r={8}
              fill="rgba(255, 255, 255, 0.95)"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth={1}
            />
            <text
              textAnchor="middle"
              x={nodeRadius - 5}
              y={-nodeRadius + 8}
              style={{
                fontSize: "8px",
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
        <p className={styles.errorMessage}>{error}</p>
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
      <div className={styles.treeHeader}>
        <div>
          <h2 className={styles.treeTitle}>Your Network Tree</h2>
          <p
            style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Explore your MLM network hierarchy and member performance
          </p>
        </div>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.currentUser}`}></div>
            <span>You</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.active}`}></div>
            <span>Active</span>
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
          pathFunc="step"
          nodeSize={{ x: 200, y: 120 }}
          separation={{ siblings: 1.2, nonSiblings: 1.5 }}
          translate={{ x: 400, y: 50 }}
          scaleExtent={{ min: 0.3, max: 2.5 }}
          renderCustomNodeElement={renderCustomNode}
          onNodeClick={handleNodeClick}
          zoomable={true}
          draggable={true}
        />

        {/* Floating controls */}
        <div className={styles.floatingControls}>
          <div className={styles.controlGroup}>
            <button
              className={styles.controlButton}
              onClick={() => {
                // Reset zoom and position
                const svg = document.querySelector(".rd3t-svg");
                if (svg) {
                  svg.style.transform = "translate(400px, 50px) scale(1)";
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
                  svg.style.transform = "translate(50%, 50%) scale(0.8)";
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
            {selectedNode.attributes?.joinDate && (
              <div className={styles.detailItem}>
                <strong>Join Date:</strong> {selectedNode.attributes.joinDate}
              </div>
            )}
            {selectedNode.attributes?.level && (
              <div className={styles.detailItem}>
                <strong>Level:</strong> {selectedNode.attributes.level}
              </div>
            )}
            {selectedNode.attributes?.earnings && (
              <div className={styles.detailItem}>
                <strong>Earnings:</strong> $
                {selectedNode.attributes.earnings.toFixed(2)}
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
