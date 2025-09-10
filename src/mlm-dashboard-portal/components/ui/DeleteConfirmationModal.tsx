import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import styles from "./DeleteConfirmationModal.module.scss";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isLoading = false,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header with Icon */}
        <div className={styles.modalHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconBackground}>
              <FiAlertTriangle className={styles.warningIcon} />
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.messageContainer}>
              <p className={styles.message}>
                {message}
                {itemName && (
                  <span className={styles.itemName}> "{itemName}"</span>
                )}
              </p>
              <div className={styles.warningBadge}>
                <FiAlertTriangle className={styles.warningIconSmall} />
                <span>This action cannot be undone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={styles.confirmButton}
          >
            {isLoading ? (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <span>Deleting...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
