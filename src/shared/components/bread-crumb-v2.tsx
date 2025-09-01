import React from "react";
import styles from "./bread-crumb-v2.module.scss";

interface BreadcrumbItem {
  label: string;
  path: string;
  active?: boolean;
}

interface BreadcrumbV2Props {
  items?: BreadcrumbItem[];
}

const BreadcrumbV2: React.FC<BreadcrumbV2Props> = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbContainer} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index < items.length - 1 ? (
              <button
                className={styles.breadcrumbLink}
                onClick={() => alert(`Navigating to: ${item.path}`)}
              >
                {item.label}
              </button>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className={styles.breadcrumbSeparator}>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbV2;
