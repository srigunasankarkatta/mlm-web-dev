import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Award,
} from "lucide-react";
import type { MLMPlan } from "../types";
import { MLM_PLANS, TESTIMONIALS, FAQ_PREVIEW } from "../data/mockData";
import AuthModal from "../components/AuthModal";
import MLMTree from "../components/MLMTree";
import CustomerLayout from "../components/CustomerLayout";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MLMPlan | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const handlePlanSelect = (plan: MLMPlan) => {
    setSelectedPlan(plan);
    console.log("Selected plan:", selectedPlan); // Use selectedPlan to avoid linter warning
    setIsAuthModalOpen(true);
  };

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 800);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSlide) return;

    const interval = setInterval(() => {
      if (isDesktop) {
        // On desktop, move by 3 cards at a time
        setCurrentSlide((prev) => {
          const nextSlide = prev + 3;
          return nextSlide >= MLM_PLANS.length ? 0 : nextSlide;
        });
      } else {
        // On mobile, move by 1 card at a time
        setCurrentSlide((prev) => (prev + 1) % MLM_PLANS.length);
      }
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoSlide, isDesktop]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoSlide(false); // Stop auto-slide when user manually navigates
  };

  const goToPrevious = () => {
    if (isDesktop) {
      setCurrentSlide((prev) => {
        const nextSlide = prev - 3;
        return nextSlide < 0 ? Math.max(0, MLM_PLANS.length - 3) : nextSlide;
      });
    } else {
      setCurrentSlide(
        (prev) => (prev - 1 + MLM_PLANS.length) % MLM_PLANS.length
      );
    }
    setIsAutoSlide(false);
  };

  const goToNext = () => {
    if (isDesktop) {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 3;
        return nextSlide >= MLM_PLANS.length ? 0 : nextSlide;
      });
    } else {
      setCurrentSlide((prev) => (prev + 1) % MLM_PLANS.length);
    }
    setIsAutoSlide(false);
  };

  const handleLogin = (identifier: string, otp: string) => {
    console.log("Login:", { identifier, otp });
    setIsAuthModalOpen(false);
  };

  const handleRegister = (data: any) => {
    console.log("Register:", data);
    setIsAuthModalOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCalculator = () => {
    navigate("/customer/calculator");
  };

  return (
    <CustomerLayout>
      <div className={styles.homePage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <h1 className={styles.heroTitle}>
                  Start Earning with{" "}
                  <span className={styles.highlight}>Simple, Transparent</span>{" "}
                  Income Plans
                </h1>
                <h2 className={styles.heroSubtitle}>
                  Buy a package, grow your network — earn Direct, Level, Club &
                  Auto Pool bonuses.
                </h2>

                <div className={styles.heroButtons}>
                  <button
                    onClick={() => handlePlanSelect(MLM_PLANS[0])}
                    className={styles.primaryButton}
                  >
                    Get Started — Buy Package
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className={styles.secondaryButton}
                  >
                    How it Works
                  </button>
                </div>

                <div className={styles.heroBullets}>
                  <div className={styles.bulletItem}>
                    <CheckCircle className={styles.bulletIcon} />
                    <span>Lifetime packages — upgrade anytime</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle className={styles.bulletIcon} />
                    <span>Direct rewards for first 4 refers</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <CheckCircle className={styles.bulletIcon} />
                    <span>Club & Auto-pool bonuses on group completion</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroRight}>
                <div className={styles.heroVisual}>
                  <MLMTree className={styles.heroMLMTree} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className={styles.howItWorksSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How it Works</h2>
            <p className={styles.sectionSubtitle}>
              Simple steps to start earning with our MLM platform
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <DollarSign className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Buy Package</h3>
              <p className={styles.stepDescription}>
                All users must buy Package-1 ($20) to be eligible for any
                income.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <Users className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Refer Directs</h3>
              <p className={styles.stepDescription}>
                First 4 directs pay Dynamic Direct % (6%, 9%, 12%, 15%).
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <TrendingUp className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Level Income</h3>
              <p className={styles.stepDescription}>
                Earn from downline up to 10 levels (configurable %).
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <Award className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Club & Auto Pool</h3>
              <p className={styles.stepDescription}>
                $0.5 club bonus per join; Auto Pool bonuses on group completion.
              </p>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className={styles.packagesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Package</h2>
            <p className={styles.sectionSubtitle}>
              Start with Package-1 and unlock higher levels as you grow
            </p>
          </div>

          <div className={styles.packagesSlider}>
            <div className={styles.sliderContainer}>
              <button
                className={styles.sliderButton}
                onClick={goToPrevious}
                aria-label="Previous package"
              >
                <ChevronLeft className={styles.sliderIcon} />
              </button>

              <div className={styles.sliderTrack}>
                <div
                  className={styles.sliderWrapper}
                  style={{
                    transform: `translateX(-${
                      currentSlide * (isDesktop ? 33.333 : 100)
                    }%)`,
                  }}
                >
                  {MLM_PLANS.map((plan) => (
                    <div key={plan.id} className={styles.sliderSlide}>
                      <div className={styles.packageCard}>
                        <div className={styles.packageHeader}>
                          <h3 className={styles.packageName}>{plan.name}</h3>
                          <div className={styles.packagePrice}>
                            ${plan.price}
                          </div>
                        </div>

                        <div className={styles.packageFeatures}>
                          <div className={styles.featureItem}>
                            <CheckCircle className={styles.featureIcon} />
                            <span>Direct Income</span>
                          </div>
                          {plan.level && (
                            <div className={styles.featureItem}>
                              <CheckCircle className={styles.featureIcon} />
                              <span>Level {plan.level} Income</span>
                            </div>
                          )}
                          <div className={styles.featureItem}>
                            <CheckCircle className={styles.featureIcon} />
                            <span>Club Bonus</span>
                          </div>
                          <div className={styles.featureItem}>
                            <CheckCircle className={styles.featureIcon} />
                            <span>Auto Pool</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handlePlanSelect(plan)}
                          className={styles.packageButton}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={styles.sliderButton}
                onClick={goToNext}
                aria-label="Next package"
              >
                <ChevronRight className={styles.sliderIcon} />
              </button>
            </div>

            {/* Slider indicators */}
            <div className={styles.sliderIndicators}>
              {isDesktop
                ? // Desktop: show indicators for groups of 3
                  Array.from({ length: Math.ceil(MLM_PLANS.length / 3) }).map(
                    (_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${
                          Math.floor(currentSlide / 3) === index
                            ? styles.activeIndicator
                            : ""
                        }`}
                        onClick={() => goToSlide(index * 3)}
                        aria-label={`Go to slide group ${index + 1}`}
                      />
                    )
                  )
                : // Mobile: show indicators for each card
                  MLM_PLANS.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${
                        index === currentSlide ? styles.activeIndicator : ""
                      }`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
            </div>

            {/* Auto-slide toggle */}
            <div className={styles.autoSlideToggle}>
              <button
                className={`${styles.toggleButton} ${
                  isAutoSlide ? styles.activeToggle : ""
                }`}
                onClick={() => setIsAutoSlide(!isAutoSlide)}
              >
                {isAutoSlide ? "Pause" : "Play"} Auto-slide
              </button>
            </div>
          </div>
        </section>

        {/* MLM Network Tree Section */}
        <section className={styles.mlmTreeSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Network Structure</h2>
            <p className={styles.sectionSubtitle}>
              Visualize your MLM network growth and earnings potential
            </p>
          </div>
          <div className={styles.glassmorphismCard}>
            <MLMTree />
          </div>
        </section>

        {/* Income Examples Section */}
        <section className={styles.incomeExamplesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Income Examples</h2>
            <p className={styles.sectionSubtitle}>
              See how much you can earn with different scenarios
            </p>
          </div>

          <div className={styles.examplesGrid}>
            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>4 Direct Refers</h3>
              <div className={styles.exampleBreakdown}>
                <div className={styles.exampleItem}>
                  <span>Direct Income:</span>
                  <span className={styles.exampleAmount}>$8.40</span>
                </div>
                <div className={styles.exampleItem}>
                  <span>Level Income:</span>
                  <span className={styles.exampleAmount}>$12.50</span>
                </div>
                <div className={styles.exampleItem}>
                  <span>Club Bonus:</span>
                  <span className={styles.exampleAmount}>$2.00</span>
                </div>
                <div className={styles.exampleTotal}>
                  <span>Total Monthly:</span>
                  <span className={styles.exampleTotalAmount}>$22.90</span>
                </div>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>8 Direct Refers</h3>
              <div className={styles.exampleBreakdown}>
                <div className={styles.exampleItem}>
                  <span>Direct Income:</span>
                  <span className={styles.exampleAmount}>$8.40</span>
                </div>
                <div className={styles.exampleItem}>
                  <span>Level Income:</span>
                  <span className={styles.exampleAmount}>$45.20</span>
                </div>
                <div className={styles.exampleItem}>
                  <span>Club Bonus:</span>
                  <span className={styles.exampleAmount}>$4.00</span>
                </div>
                <div className={styles.exampleTotal}>
                  <span>Total Monthly:</span>
                  <span className={styles.exampleTotalAmount}>$57.60</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calculatorCta}>
            <button
              className={styles.calculatorButton}
              onClick={handleOpenCalculator}
            >
              <Calculator className={styles.calculatorIcon} />
              Open Earnings Simulator
            </button>
          </div>
        </section>

        {/* Eligibility & Rules Section */}
        <section className={styles.eligibilitySection}>
          <div className={styles.eligibilityCard}>
            <div className={styles.eligibilityHeader}>
              <Shield className={styles.eligibilityIcon} />
              <h3 className={styles.eligibilityTitle}>Eligibility & Rules</h3>
            </div>
            <div className={styles.eligibilityContent}>
              <p className={styles.eligibilityNotice}>
                <strong>Important:</strong> Package-1 is compulsory. If
                upline/recipient does not have required package, that income is
                not paid.
              </p>
              <ul className={styles.eligibilityRules}>
                <li>Only first 4 directs get Direct Income</li>
                <li>Level income requires matching package level</li>
                <li>Income not passed up if recipient not eligible</li>
                <li>All packages are lifetime - upgrade anytime</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className={styles.leaderboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Earners</h2>
            <p className={styles.sectionSubtitle}>Updated in real-time</p>
          </div>

          <div className={styles.leaderboardGrid}>
            {[1, 2, 3, 4, 5].map((rank) => (
              <div key={rank} className={styles.leaderboardItem}>
                <div className={styles.leaderboardRank}>#{rank}</div>
                <div className={styles.leaderboardAvatar}>
                  <Users className={styles.leaderboardAvatarIcon} />
                </div>
                <div className={styles.leaderboardInfo}>
                  <div className={styles.leaderboardName}>User {rank}</div>
                  <div className={styles.leaderboardPackage}>
                    Package-{rank}
                  </div>
                </div>
                <div className={styles.leaderboardEarnings}>
                  ${(1000 - rank * 100).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.leaderboardCta}>
            <button className={styles.leaderboardButton}>
              View Full Leaderboard
            </button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Users Say</h2>
            <p className={styles.sectionSubtitle}>
              Real stories from real earners
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    <Users className={styles.testimonialAvatarIcon} />
                  </div>
                  <div className={styles.testimonialInfo}>
                    <div className={styles.testimonialName}>
                      {testimonial.name}
                    </div>
                    <div className={styles.testimonialLocation}>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Get answers to common questions
            </p>
          </div>

          <div className={styles.faqList}>
            {FAQ_PREVIEW.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`${styles.faqIcon} ${
                      openFaqIndex === index ? styles.faqIconOpen : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to start earning?</h2>
            <p className={styles.ctaSubtitle}>
              Buy Package-1 now and unlock your first incomes.
            </p>
            <div className={styles.ctaButtons}>
              <button
                onClick={() => handlePlanSelect(MLM_PLANS[0])}
                className={styles.ctaButton}
              >
                Buy Package — $20
              </button>
              <button className={styles.ctaSecondaryButton}>
                Contact Sales
              </button>
            </div>
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
    </CustomerLayout>
  );
};

export default HomePage;
