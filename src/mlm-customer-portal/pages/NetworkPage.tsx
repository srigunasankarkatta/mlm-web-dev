import React, { useState } from "react";
import NetworkTree from "../components/NetworkTree";
import styles from "./NetworkPage.module.scss";

const NetworkPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree");
  const [maxDepth, setMaxDepth] = useState(3);

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
            <div className={styles.listHeader}>
              <h2>Network Members</h2>
              <div className={styles.listStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Total Members:</span>
                  <span className={styles.statValue}>12</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Active Members:</span>
                  <span className={styles.statValue}>10</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Total Earnings:</span>
                  <span className={styles.statValue}>$2,450.75</span>
                </div>
              </div>
            </div>

            <div className={styles.membersList}>
              <div className={styles.listItem}>
                <div className={styles.memberInfo}>
                  <div className={styles.memberAvatar}>J</div>
                  <div className={styles.memberDetails}>
                    <h3>John Smith</h3>
                    <p>john@example.com</p>
                    <span className={styles.memberLevel}>Level 2</span>
                  </div>
                </div>
                <div className={styles.memberStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Earnings</span>
                    <span className={styles.statValue}>$850.25</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Status</span>
                    <span className={`${styles.status} ${styles.active}`}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.listItem}>
                <div className={styles.memberInfo}>
                  <div className={styles.memberAvatar}>S</div>
                  <div className={styles.memberDetails}>
                    <h3>Sarah Wilson</h3>
                    <p>sarah@example.com</p>
                    <span className={styles.memberLevel}>Level 2</span>
                  </div>
                </div>
                <div className={styles.memberStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Earnings</span>
                    <span className={styles.statValue}>$680.75</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Status</span>
                    <span className={`${styles.status} ${styles.active}`}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.listItem}>
                <div className={styles.memberInfo}>
                  <div className={styles.memberAvatar}>T</div>
                  <div className={styles.memberDetails}>
                    <h3>Tom Davis</h3>
                    <p>tom@example.com</p>
                    <span className={styles.memberLevel}>Level 2</span>
                  </div>
                </div>
                <div className={styles.memberStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Earnings</span>
                    <span className={styles.statValue}>$450.00</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Status</span>
                    <span className={`${styles.status} ${styles.inactive}`}>
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;
