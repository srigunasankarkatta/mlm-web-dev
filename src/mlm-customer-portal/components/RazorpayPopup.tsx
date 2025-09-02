import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./RazorpayPopup.module.scss";

interface RazorpayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentToken: string) => void;
  packageDetails: {
    id: number; // Changed from string to number for API compatibility
    name: string;
    price: number;
    description: string;
  };
}

const RazorpayPopup: React.FC<RazorpayPopupProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  packageDetails,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "form" | "processing" | "success"
  >("form");

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success");
      // Generate a dummy payment token
      const paymentToken = `rzp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      setTimeout(() => {
        onPaymentSuccess(paymentToken);
        onClose();
        setPaymentStep("form");
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Razorpay</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {paymentStep === "form" && (
            <>
              <div className={styles.packageInfo}>
                <h3>Package Details</h3>
                <div className={styles.packageCard}>
                  <h4>{packageDetails.name}</h4>
                  <p>{packageDetails.description}</p>
                  <div className={styles.price}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amount}>
                      {packageDetails.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.paymentForm}>
                <h3>Payment Information</h3>
                <div className={styles.formGroup}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className={styles.input}
                    disabled
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className={styles.input}
                      disabled
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className={styles.input}
                      disabled
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={styles.input}
                    disabled
                  />
                </div>
              </div>

              <div className={styles.paymentSummary}>
                <div className={styles.summaryRow}>
                  <span>Package Price</span>
                  <span>₹{packageDetails.price}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>GST (18%)</span>
                  <span>₹{(packageDetails.price * 0.18).toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow + " " + styles.total}>
                  <span>Total Amount</span>
                  <span>₹{(packageDetails.price * 1.18).toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.cancelButton} onClick={onClose}>
                  Cancel
                </button>
                <button className={styles.payButton} onClick={handlePayment}>
                  Pay ₹{(packageDetails.price * 1.18).toFixed(2)}
                </button>
              </div>
            </>
          )}

          {paymentStep === "processing" && (
            <div className={styles.processing}>
              <div className={styles.spinner}></div>
              <h3>Processing Payment...</h3>
              <p>Please wait while we process your payment</p>
            </div>
          )}

          {paymentStep === "success" && (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              <h3>Payment Successful!</h3>
              <p>Your payment has been processed successfully</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.security}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Secured by Razorpay</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RazorpayPopup;
