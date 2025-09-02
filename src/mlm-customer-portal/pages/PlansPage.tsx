import React, { useState } from "react";
import type { MLMPlan } from "../types";
import { MLM_PLANS } from "../data/mockData";
import AuthModal from "../components/AuthModal";
import RazorpayPopup from "../components/RazorpayPopup";
import { usePayment } from "../hooks/usePayment";
import { useRegister } from "../queries/auth";
import { usePackages } from "../queries/packages";
import { CustomerAuthService } from "../api-services/auth-service";
import styles from "./PlansPage.module.scss";

const PlansPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MLMPlan | null>(null);

  // Fetch packages from API
  const {
    data: packagesData,
    isLoading: isPackagesLoading,
    error: packagesError,
    refetch: refetchPackages,
  } = usePackages({ perPage: 100 }); // Get all packages

  // Utility function to convert package ID from string to integer
  const convertPackageId = (planId: string): number => {
    const numericId = parseInt(planId.replace("package-", ""), 10);
    if (isNaN(numericId)) {
      console.error("Invalid package ID format:", planId);
      return 1; // Default to package 1 if conversion fails
    }
    return numericId;
  };

  // Transform API packages to MLMPlan format for compatibility
  const transformApiPackageToMLMPlan = (apiPackage: any): MLMPlan => {
    return {
      id: apiPackage.id,
      name: apiPackage.name,
      price: apiPackage.price,
      level: apiPackage.rank || 1,
      benefits: apiPackage.features || [],
      unlocks: generateUnlocksFromPackage(apiPackage),
      isRequired: apiPackage.isRequired || false,
      description: apiPackage.description || "",
      features: apiPackage.features || [],
    };
  };

  // Generate unlocks array based on package data
  const generateUnlocksFromPackage = (apiPackage: any): string[] => {
    const unlocks: string[] = [];

    if (apiPackage.directCommission > 0) unlocks.push("Direct");
    if (apiPackage.levelCommissions && apiPackage.levelCommissions.length > 0)
      unlocks.push("Level");
    if (apiPackage.clubCommission > 0) unlocks.push("Club");
    if (apiPackage.autoPoolCommission > 0) unlocks.push("AutoPool");

    return unlocks;
  };

  // Get packages data - use API data if available, fallback to mock data
  const packages =
    packagesData?.data?.map(transformApiPackageToMLMPlan) || MLM_PLANS;

  const {
    isPaymentModalOpen,
    selectedPackage,
    initiatePayment,
    handlePaymentSuccess,
    closePaymentModal,
    isProcessing,
  } = usePayment();

  const registerMutation = useRegister();

  const handlePlanSelect = (plan: MLMPlan) => {
    // Check if user is authenticated
    const isAuthenticated = CustomerAuthService.isAuthenticated();

    if (!isAuthenticated) {
      // Show auth modal for unauthenticated users
      setSelectedPlan(plan);
      setIsAuthModalOpen(true);
    } else {
      // Show payment modal for authenticated users
      const packageId = convertPackageId(plan.id);
      console.log("Converting package ID:", {
        originalId: plan.id,
        convertedId: packageId,
      });
      initiatePayment({
        id: packageId,
        name: plan.name,
        price: plan.price,
        description: plan.features.join(", "),
      });
    }
  };

  const handleLogin = (identifier: string, otp: string) => {
    // TODO: Implement login logic
    console.log("Login:", { identifier, otp });
    setIsAuthModalOpen(false);

    // After successful login, initiate payment for the selected plan
    if (selectedPlan) {
      const packageId = convertPackageId(selectedPlan.id);
      initiatePayment({
        id: packageId,
        name: selectedPlan.name,
        price: selectedPlan.price,
        description: selectedPlan.features.join(", "),
      });
    }
  };

  const handleRegister = async (data: any) => {
    try {
      console.log("Registering user with data:", data);

      // Validate required fields
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.password_confirmation
      ) {
        console.error("Missing required fields for registration");
        return;
      }

      // Validate password confirmation
      if (data.password !== data.password_confirmation) {
        console.error("Password confirmation does not match");
        return;
      }

      // Call the register API
      const result = await registerMutation.mutateAsync(data);

      console.log("Registration successful:", result);
      setIsAuthModalOpen(false);

      // After successful registration, initiate payment for the selected plan
      if (selectedPlan) {
        const packageId = convertPackageId(selectedPlan.id);
        initiatePayment({
          id: packageId,
          name: selectedPlan.name,
          price: selectedPlan.price,
          description: selectedPlan.features.join(", "),
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Error handling is done in the mutation's onError callback
    }
  };

  // Show loading state
  if (isPackagesLoading) {
    return (
      <div className={styles.plansPage}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state with fallback to mock data
  if (packagesError) {
    console.warn(
      "Failed to load packages from API, using mock data:",
      packagesError
    );
  }

  return (
    <div className={styles.plansPage}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Choose Your MLM Package</h1>
          <p className={styles.pageSubtitle}>
            Start with Package-1 ($20) and unlock higher levels as you grow.
            Each package opens new income opportunities.
          </p>
          {packagesError && (
            <div className={styles.errorBanner}>
              <p>⚠️ Using cached data. Some packages may not be up to date.</p>
              <button
                onClick={() => refetchPackages()}
                className={styles.retryButton}
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Eligibility Rules */}
        <div className={styles.eligibilitySection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📋</span>
            Eligibility Rules
          </h2>
          <div className={styles.eligibilityRules}>
            <div className={styles.ruleCard}>
              <div className={styles.ruleTitle}>
                <span className={styles.ruleNumber}>1</span>
                Package-1 is Mandatory
              </div>
              <p className={styles.ruleDescription}>
                All users must start with Package-1 ($20) to access the platform
              </p>
            </div>
            <div className={styles.ruleCard}>
              <div className={styles.ruleTitle}>
                <span className={styles.ruleNumber}>2</span>
                Sequential Unlocking
              </div>
              <p className={styles.ruleDescription}>
                Higher packages unlock higher level income streams
              </p>
            </div>
            <div className={styles.ruleCard}>
              <div className={styles.ruleTitle}>
                <span className={styles.ruleNumber}>3</span>
                Income Multiplier
              </div>
              <p className={styles.ruleDescription}>
                Each level provides percentage-based income from your network
              </p>
            </div>
            <div className={styles.ruleCard}>
              <div className={styles.ruleTitle}>
                <span className={styles.ruleNumber}>4</span>
                Auto Pool Access
              </div>
              <p className={styles.ruleDescription}>
                All packages include auto pool progression benefits
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className={styles.plansGrid}>
          {packages.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${
                plan.isRequired ? styles.requiredPlan : ""
              }`}
            >
              <div className={styles.planContent}>
                {/* Header */}
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.planPrice}>${plan.price}</div>
                  {plan.isRequired && (
                    <span className={styles.requiredBadge}>Required</span>
                  )}
                </div>

                {/* Features */}
                <div className={styles.planFeatures}>
                  {plan.features.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <div className={styles.featureIcon}>✓</div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Unlocks */}
                <div className={styles.planUnlocks}>
                  <h4 className={styles.unlocksTitle}>Unlocks:</h4>
                  <div className={styles.unlocksList}>
                    {plan.unlocks.map((unlock, index) => (
                      <span key={index} className={styles.unlockTag}>
                        {unlock}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`${styles.actionButton} ${
                    plan.isRequired
                      ? styles.primaryButton
                      : styles.secondaryButton
                  }`}
                >
                  {plan.isRequired ? "Get Started" : "Upgrade Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className={styles.comparisonSection}>
          <h2 className={styles.sectionTitle}>Package Comparison</h2>
          <div className={styles.comparisonTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerTitle}>Feature Comparison</div>
              <div className={styles.headerSubtitle}>
                See what each package unlocks
              </div>
            </div>
            <div className={styles.tableBody}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Price</div>
                {packages.map((plan) => (
                  <div key={plan.id} className={styles.tableCell}>
                    ${plan.price}
                  </div>
                ))}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Direct Income</div>
                {packages.map((plan) => (
                  <div key={plan.id} className={styles.tableCell}>
                    {plan.unlocks.includes("Direct") ? (
                      <span className={styles.featureIcon + " " + styles.check}>
                        ✓
                      </span>
                    ) : (
                      <span className={styles.featureIcon + " " + styles.cross}>
                        ✗
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Level Income</div>
                {packages.map((plan) => (
                  <div key={plan.id} className={styles.tableCell}>
                    {plan.unlocks.includes("Level") ? (
                      `L${plan.level}`
                    ) : (
                      <span className={styles.featureIcon + " " + styles.cross}>
                        ✗
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Club Income</div>
                {packages.map((plan) => (
                  <div key={plan.id} className={styles.tableCell}>
                    {plan.unlocks.includes("Club") ? (
                      <span className={styles.featureIcon + " " + styles.check}>
                        ✓
                      </span>
                    ) : (
                      <span className={styles.featureIcon + " " + styles.cross}>
                        ✗
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Auto Pool</div>
                {packages.map((plan) => (
                  <div key={plan.id} className={styles.tableCell}>
                    {plan.unlocks.includes("AutoPool") ? (
                      <span className={styles.featureIcon + " " + styles.check}>
                        ✓
                      </span>
                    ) : (
                      <span className={styles.featureIcon + " " + styles.cross}>
                        ✗
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Start Earning?</h2>
          <p className={styles.ctaSubtitle}>
            Choose your package and begin your MLM journey today
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={styles.ctaButton}
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isRegistering={registerMutation.isPending}
      />

      {/* Razorpay Payment Modal */}
      {selectedPackage && (
        <RazorpayPopup
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
          packageDetails={selectedPackage}
        />
      )}
    </div>
  );
};

export default PlansPage;
