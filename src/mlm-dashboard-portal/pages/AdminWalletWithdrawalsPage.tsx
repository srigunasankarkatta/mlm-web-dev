import React from "react";
import AdminWithdrawals from "../features/wallet/components/AdminWithdrawals";
import styles from "./AdminWalletWithdrawalsPage.module.scss";

const AdminWalletWithdrawalsPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Withdrawal Management</h1>
        <p className={styles.subtitle}>
          Process and manage withdrawal requests
        </p>
      </div>
      <AdminWithdrawals />
    </div>
  );
};

export default AdminWalletWithdrawalsPage;
