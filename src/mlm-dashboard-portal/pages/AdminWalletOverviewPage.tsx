import React from "react";
import AdminWalletStatistics from "../features/wallet/components/AdminWalletStatistics";
import { useAdminWalletState } from "../hooks/useAdminWallet";
import styles from "./AdminWalletOverviewPage.module.scss";

const AdminWalletOverviewPage: React.FC = () => {
  const {
    walletStatistics,
    walletDashboard,
    exportTransactions,
    exportWithdrawals,
  } = useAdminWalletState();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wallet Overview</h1>
        <p className={styles.subtitle}>
          Comprehensive wallet statistics and analytics
        </p>
      </div>
      <AdminWalletStatistics
        statistics={walletStatistics}
        dashboard={walletDashboard}
        onExportTransactions={() => exportTransactions()}
        onExportWithdrawals={() => exportWithdrawals()}
      />
    </div>
  );
};

export default AdminWalletOverviewPage;
