import React from "react";
import { WalletDashboard } from "../components";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./WalletDemoPage.module.scss";

const WalletDemoPage: React.FC = () => {
  return (
    <CustomerLayout>
      <div className={styles.walletDemoPage}>
        <div className={styles.header}>
          <h1>Wallet API Integration Demo</h1>
          <p>
            This page demonstrates the complete wallet API integration with all
            endpoints and UI components.
          </p>
        </div>

        <WalletDashboard />
      </div>
    </CustomerLayout>
  );
};

export default WalletDemoPage;
