import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import IncomeCalculator from "../../components/IncomeCalculator";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./IncomeCalculatorPage.module.scss";

const IncomeCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <CustomerLayout>
      <div className={styles.calculatorPage}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <button onClick={handleGoBack} className={styles.backButton}>
              <ArrowLeft className={styles.backIcon} />
              Back
            </button>
            <div className={styles.headerTitle}>
              <Calculator className={styles.titleIcon} />
              <h1>MLM Income Calculator</h1>
            </div>
          </div>
        </div>

        {/* Calculator Content */}
        <div className={styles.calculatorContent}>
          <IncomeCalculator isOpen={true} onClose={handleGoBack} />
        </div>
      </div>
    </CustomerLayout>
  );
};

export default IncomeCalculatorPage;
