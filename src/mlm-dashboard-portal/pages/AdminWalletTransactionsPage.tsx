import React from "react";
import AdminWalletTransactions from "../features/wallet/components/AdminWalletTransactions";
import styles from "./AdminWalletTransactionsPage.module.scss";

const AdminWalletTransactionsPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wallet Transactions</h1>
        <p className={styles.subtitle}>
          View and manage all wallet transactions
        </p>
      </div>
      <AdminWalletTransactions />
    </div>
  );
};

export default AdminWalletTransactionsPage;
