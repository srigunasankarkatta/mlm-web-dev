import React from "react";
import { WalletDashboard } from "../components";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./WalletPage.module.scss";

const WalletPage: React.FC = () => {
  return (
    <CustomerLayout>
      <div className={styles.walletPage}>
        <WalletDashboard />
      </div>
    </CustomerLayout>
  );
};

export default WalletPage;
