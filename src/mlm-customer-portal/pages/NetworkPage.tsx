import React, { useState, useMemo } from "react";
import NetworkTree from "../components/NetworkTree";
import { useUserTeamTree } from "../hooks/useProfile";
import { TeamTreeNode } from "../api-services/profile-service";
import styles from "./NetworkPage.module.scss";

const NetworkPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree");
  const [maxDepth, setMaxDepth] = useState(3);

  // Fetch team tree data
  const { data: teamTreeResponse, isLoading, error } = useUserTeamTree();

  // Flatten tree data into a list for list view
  const flattenedMembers = useMemo(() => {
    if (!teamTreeResponse?.data) return [];

    const flattenNode = (node: TeamTreeNode): TeamTreeNode[] => {
      const result = [node];
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          result.push(...flattenNode(child));
        });
      }
      return result;
    };

    return flattenNode(teamTreeResponse.data);
  }, [teamTreeResponse]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMembers = flattenedMembers.length;
    const activeMembers = flattenedMembers.filter(
      (member) => member.level > 1
    ).length; // Assuming level 1 is root, others are active
    const totalEarnings = 0; // API doesn't provide earnings data in tree response

    return {
      totalMembers,
      activeMembers,
      totalEarnings: totalEarnings.toFixed(2),
    };
  }, [flattenedMembers]);

  return (
    <div className={styles.networkPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Network Tree</h1>
          <p className={styles.pageSubtitle}>
            Visualize your MLM network and track your downline performance
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.viewControls}>
            <button
              className={`${styles.viewButton} ${
                viewMode === "tree" ? styles.active : ""
              }`}
              onClick={() => setViewMode("tree")}
            >
              Tree View
            </button>
            <button
              className={`${styles.viewButton} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              List View
            </button>
          </div>

          <div className={styles.depthControl}>
            <label htmlFor="depth-select">Max Depth:</label>
            <select
              id="depth-select"
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              className={styles.depthSelect}
            >
              <option value={2}>2 Levels</option>
              <option value={3}>3 Levels</option>
              <option value={4}>4 Levels</option>
              <option value={5}>5 Levels</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.pageContent}>
        {viewMode === "tree" ? (
          <NetworkTree maxDepth={maxDepth} />
        ) : (
          <div className={styles.listView}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading network members...</p>
              </div>
            ) : error ? (
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
            ) : (
              <>
                <div className={styles.listHeader}>
                  <h2>Network Members</h2>
                  <div className={styles.listStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Total Members:</span>
                      <span className={styles.statValue}>
                        {stats.totalMembers}
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Active Members:</span>
                      <span className={styles.statValue}>
                        {stats.activeMembers}
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Total Earnings:</span>
                      <span className={styles.statValue}>
                        ${stats.totalEarnings}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.membersList}>
                  {flattenedMembers.map((member) => (
                    <div key={member.id} className={styles.listItem}>
                      <div className={styles.memberInfo}>
                        <div className={styles.memberAvatar}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.memberDetails}>
                          <h3>{member.name}</h3>
                          <p>{member.email}</p>
                          <span className={styles.memberLevel}>
                            Level {member.level}
                          </span>
                        </div>
                      </div>
                      <div className={styles.memberStats}>
                        <div className={styles.stat}>
                          <span className={styles.statLabel}>
                            Referral Code
                          </span>
                          <span className={styles.statValue}>
                            {member.referral_code}
                          </span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statLabel}>Package</span>
                          <span className={styles.statValue}>
                            {member.package}
                          </span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statLabel}>Status</span>
                          <span className={`${styles.status} ${styles.active}`}>
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;
