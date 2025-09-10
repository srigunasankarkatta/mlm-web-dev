import React from "react";
import type { WalletBalance } from "../api-services/wallet-service";
import { useWalletUtils } from "../hooks/useWallet";
import styles from "./WalletCard.module.scss";

interface WalletCardProps {
  walletType: string;
  wallet: WalletBalance;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  walletType,
  wallet,
  isSelected = false,
  onClick,
  className = "",
}) => {
  const { formatCurrency, getWalletIcon, getWalletColor } = useWalletUtils();
console.log("wallet", wallet);
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.walletCard} ${
        isSelected ? styles.selected : ""
      } ${className}`}
      onClick={handleClick}
    >
      <div className={styles.walletHeader}>
        <div className={styles.walletIcon}>
          <i className={`icon-${getWalletIcon(walletType)}`}></i>
        </div>
        <div className={styles.walletInfo}>
          <h3 className={styles.walletName}>{wallet.display_name}</h3>
          <div className={styles.walletType}>
            <span
              className={`${styles.typeBadge} ${
                styles[getWalletColor(walletType)]
              }`}
            >
              {walletType.charAt(0).toUpperCase() + walletType.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.walletBalance}>
        <div className={styles.balanceAmount}>
          {formatCurrency(wallet.balance)}
        </div>
        <div className={styles.availableBalance}>
          Available: {formatCurrency(wallet.balance)}
        </div>
      </div>

      <div className={styles.walletFooter}>
        <div className={styles.withdrawalStatus}>
          {wallet.withdrawal_enabled ? (
            <span className={styles.enabled}>
              <i className="icon-check-circle"></i>
              Withdrawal Enabled
            </span>
          ) : (
            <span className={styles.disabled}>
              <i className="icon-lock"></i>
              Withdrawal Disabled
            </span>
          )}
        </div>
      </div>

      {isSelected && (
        <div className={styles.selectedIndicator}>
          <i className="icon-check"></i>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
