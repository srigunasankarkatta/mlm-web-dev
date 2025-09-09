import React from "react";
import AdminWalletList from "../features/wallet/components/AdminWalletList";
import styles from "./AdminWalletListPage.module.scss";

const AdminWalletListPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wallet Management</h1>
        <p className={styles.subtitle}>Manage and monitor all user wallets</p>
      </div>
      <AdminWalletList />
    </div>
  );
};

export default AdminWalletListPage;
