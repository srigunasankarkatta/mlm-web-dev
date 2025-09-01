import React, { useState } from 'react';
import type { MLMPlan } from '../types';
import { HERO_CONTENT, INCOME_BREAKDOWN } from '../data/mockData';
import PlanSlider from '../components/PlanSlider';
import IncomeBreakdownCard from '../components/IncomeBreakdownCard';
import AuthModal from '../components/AuthModal';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MLMPlan | null>(null);

  const handlePlanSelect = (plan: MLMPlan) => {
    setSelectedPlan(plan);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (identifier: string, otp: string) => {
    // TODO: Implement login logic
    console.log('Login:', { identifier, otp });
    setIsAuthModalOpen(false);
  };

  const handleRegister = (data: any) => {
    // TODO: Implement registration logic
    console.log('Register:', data);
    setIsAuthModalOpen(false);
  };

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {HERO_CONTENT.title}
          </h1>
          <p className={styles.heroSubtitle}>
            {HERO_CONTENT.subtitle}
          </p>
          <p className={styles.heroSubtitle}>
            {HERO_CONTENT.description}
          </p>
            
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {HERO_CONTENT.benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-center">{benefit}</p>
              </div>
            ))}
          </div>

          <div className={styles.heroButtons}>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={styles.primaryButton}
            >
              Get Started Now
            </button>
            <button className={styles.secondaryButton}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Plans Slider Section */}
      <section className={styles.plansSection}>
        <div className="max-w-7xl mx-auto">
          <PlanSlider onPlanSelect={handlePlanSelect} />
        </div>
      </section>

      {/* Income Types Section */}
      <section className={styles.incomeTypesSection}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Multiple Income Streams
            </h2>
            <p className={styles.sectionSubtitle}>
              Unlock different types of income as you build your network and progress through our MLM system
            </p>
          </div>

          <div className={styles.incomeGrid}>
            {INCOME_BREAKDOWN.map((income, index) => (
              <IncomeBreakdownCard key={index} income={income} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Start Your MLM Journey?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of successful members who are already earning from multiple income streams
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={styles.ctaButton}
          >
            Start Earning Today
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default HomePage;
