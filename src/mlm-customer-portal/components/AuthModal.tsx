import React, { useState } from 'react';
import type { MLMPlan } from '../types';
import { MLM_PLANS } from '../data/mockData';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    referralCode: '',
    planId: 'package-1'
  });
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');

  const resetForm = () => {
    setStep('form');
    setFormData({ name: '', email: '', mobile: '', referralCode: '', planId: 'package-1' });
    setIdentifier('');
    setOtp('');
  };

  // Sync internal state with mode prop
  React.useEffect(() => {
    setIsLogin(mode === 'login');
    setStep('form');
    resetForm();
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (step === 'form') {
        setStep('otp');
      } else {
        console.log('Login attempt:', { identifier, otp });
        // In real app, this would call the login API
        onClose();
      }
    } else {
      console.log('Register attempt:', formData);
      // In real app, this would call the register API
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.authModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              {isLogin ? 'Welcome Back' : 'Join Our Platform'}
            </h2>
            <p className={styles.modalSubtitle}>
              {isLogin ? 'Sign in to access your dashboard' : 'Create your account and start earning'}
            </p>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Toggle Buttons */}
          <div className={styles.toggleButtons}>
            <button
              onClick={() => {
                onModeChange('login');
              }}
              className={`${styles.toggleButton} ${isLogin ? styles.active : ''}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                onModeChange('register');
              }}
              className={`${styles.toggleButton} ${!isLogin ? styles.active : ''}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {isLogin ? (
              // Login Form
              <>
                {step === 'form' ? (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Email or Mobile
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Enter email or mobile"
                      className={styles.formInput}
                      required
                    />
                  </div>
                ) : (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      OTP Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className={styles.formInput}
                      maxLength={6}
                      required
                    />
                    <p className={styles.helpText}>
                      We've sent a 6-digit code to your {identifier.includes('@') ? 'email' : 'mobile'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              // Register Form
              <>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter mobile number"
                    className={styles.formInput}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referralCode}
                    onChange={(e) => handleInputChange('referralCode', e.target.value)}
                    placeholder="Enter referral code"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Select Package
                  </label>
                  <select
                    value={formData.planId}
                    onChange={(e) => handleInputChange('planId', e.target.value)}
                    className={styles.formSelect}
                    required
                  >
                    {MLM_PLANS.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}
                      </option>
                    ))}
                  </select>
                  <p className={styles.helpText}>
                    Package-1 ($20) is required to start
                  </p>
                </div>
              </>
            )}

            <button
              type="submit"
              className={styles.submitButton}
            >
              {isLogin ? (step === 'form' ? 'Send OTP' : 'Login') : 'Register & Purchase'}
            </button>
          </form>

          {isLogin && step === 'otp' && (
            <button
              onClick={() => setStep('form')}
              className={styles.backButton}
            >
              ← Back to email/mobile
            </button>
          )}

          <div className={styles.toggleLink}>
            <p className={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  onModeChange(isLogin ? 'register' : 'login');
                }}
                className={styles.toggleButton}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
