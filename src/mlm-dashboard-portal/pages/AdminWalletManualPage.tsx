import React from "react";
import AdminManualTransactions from "../features/wallet/components/AdminManualTransactions";
import styles from "./AdminWalletManualPage.module.scss";

const AdminWalletManualPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manual Transactions</h1>
        <p className={styles.subtitle}>Manually credit or debit user wallets</p>
      </div>
      <AdminManualTransactions />
    </div>
  );
};

export default AdminWalletManualPage;
