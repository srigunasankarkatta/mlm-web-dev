import React, { useEffect } from "react";
import styles from "./Notification.module.scss";

interface NotificationProps {
  type: "success" | "error" | "info";
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationIcon}>
          {type === "success" && "✓"}
          {type === "error" && "✗"}
          {type === "info" && "ℹ"}
        </div>
        <div className={styles.notificationMessage}>{message}</div>
        <button
          className={styles.notificationClose}
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
