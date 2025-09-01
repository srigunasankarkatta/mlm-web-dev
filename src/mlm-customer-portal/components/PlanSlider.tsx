import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { MLMPlan } from '../types';
import { MLM_PLANS } from '../data/mockData';
import styles from './PlanSlider.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PlanSliderProps {
  onPlanSelect: (plan: MLMPlan) => void;
}

const PlanSlider: React.FC<PlanSliderProps> = ({ onPlanSelect }) => {
  return (
    <div className={styles.planSlider}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.sliderTitle}>
          Fast Track Packages
        </h2>
        <p className={styles.sliderSubtitle}>
          Choose your package and unlock multiple income streams
        </p>
      </div>
      
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            clickable: true,
            el: `.${styles.swiperPagination}`,
            bulletClass: styles.swiperPaginationBullet,
            bulletActiveClass: styles.swiperPaginationBulletActive,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className={styles.swiper}
        >
          {MLM_PLANS.map((plan) => (
            <SwiperSlide key={plan.id} className={styles.swiperSlide}>
              <div className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>
                    {plan.name}
                  </h3>
                  <div className={styles.planPrice}>
                    ${plan.price}
                  </div>
                  {plan.isRequired && (
                    <span className={styles.requiredBadge}>
                      Required
                    </span>
                  )}
                </div>
                
                <div className={styles.planBenefits}>
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className={styles.benefitItem}>
                      <div className={styles.benefitIcon}>
                        ✓
                      </div>
                      <span className={styles.benefitText}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => onPlanSelect(plan)}
                  className={styles.selectButton}
                >
                  Select Plan
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Buttons */}
        <div className={`${styles.swiperButtonPrev} swiper-button-prev`}></div>
        <div className={`${styles.swiperButtonNext} swiper-button-next`}></div>
        
        {/* Custom Pagination */}
        <div className={styles.swiperPagination}></div>
      </div>
    </div>
  );
};

export default PlanSlider;
