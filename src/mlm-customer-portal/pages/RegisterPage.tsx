import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../queries/auth';
import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    referralCode: '',
    planId: 'package-1',
    password: '',
    passwordConfirmation: ''
  });
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await registerMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        referralCode: formData.referralCode || undefined,
        planId: formData.planId,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation
      });
      
      // Navigate to dashboard on success
      navigate('/customer/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        

        {/* Registration Form */}
        <div className={styles.registerForm}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Create Account</h2>
            <p className={styles.formSubtitle}>Join our MLM platform and start earning</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                FULL NAME
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
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                MOBILE NUMBER
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="Enter your mobile number"
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
                placeholder="Enter referral code if you have one"
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
                <option value="package-1">Package-1 - $20 (Required to start)</option>
                <option value="package-2">Package-2 - $40</option>
                <option value="package-3">Package-3 - $60</option>
                <option value="package-4">Package-4 - $80</option>
                <option value="package-5">Package-5 - $100</option>
              </select>
              <p className={styles.helpText}>
                Package-1 ($20) is required to start. Higher packages unlock more earning levels.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                PASSWORD
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={formData.passwordConfirmation}
                onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}
                placeholder="Confirm your password"
                className={styles.formInput}
                required
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creating Account...' : 'Create Account & Purchase'}
            </button>
          </form>

        
          {/* Header */}
        <div className={styles.registerHeader}>
          <Link to="/customer" className={styles.backLink}>
            <svg className={styles.backIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <span>M</span>
            </div>
            <h1 className={styles.logoText}>MLM Portal</h1>
          </div>
        </div>
        </div>

        {/* Side Panel */}
        <div className={styles.sidePanel}>
          <div className={styles.panelContent}>
            <h3 className={styles.panelTitle}>Why Choose Our Platform?</h3>
            <p className={styles.panelSubtitle}>
              Join thousands of successful members who are already earning through our proven MLM system
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>💰</div>
                <div className={styles.featureText}>
                  <h4>Multiple Income Streams</h4>
                  <p>Direct, Level, Club, and Auto Pool earnings</p>
                </div>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🚀</div>
                <div className={styles.featureText}>
                  <h4>Fast Track Packages</h4>
                  <p>Start with just $20 and unlock higher levels</p>
                </div>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📱</div>
                <div className={styles.featureText}>
                  <h4>Mobile First</h4>
                  <p>Manage your business from anywhere</p>
                </div>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🎯</div>
                <div className={styles.featureText}>
                  <h4>Proven System</h4>
                  <p>Tested and verified MLM structure</p>
                </div>
              </div>
            </div>

            <div className={styles.benefits}>
              <h4>What You Get:</h4>
              <ul>
                <li>Personal dashboard to track earnings</li>
                <li>Network building tools</li>
                <li>24/7 support system</li>
                <li>Training materials</li>
                <li>Withdrawal system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
