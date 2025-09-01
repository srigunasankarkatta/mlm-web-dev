import React from "react";
import clsx from "clsx";
import styles from "../styles/header-card.module.scss";

interface HeaderCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeaderCard: React.FC<HeaderCardProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.modernCard, styles.headerCard, className)}>
      <div className={styles.cardHeaderContent}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>{title}</h1>
          {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
        </div>
        {children && <div className={styles.headerActions}>{children}</div>}
      </div>
    </div>
  );
};

export default HeaderCard;
