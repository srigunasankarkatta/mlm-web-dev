import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useState, useEffect } from "react";

interface Stat {
  label: string;
  value: string;
  description: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const timer = setTimeout(() => {
          animateCount(stat.label, stat.value);
        }, index * 200);
        return () => clearTimeout(timer);
      });
    }
  }, [isInView, stats]);

  const animateCount = (label: string, targetValue: string) => {
    const numericValue = parseInt(targetValue.replace(/\D/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }

      setCounts((prev) => ({
        ...prev,
        [label]: Math.floor(current),
      }));
    }, duration / steps);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="stats-section"
      className="section-padding bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Trusted by Businesses Worldwide
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our track record speaks for itself. We've delivered exceptional
            results across industries and helped businesses achieve their
            digital transformation goals.
          </motion.p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/10 to-transparent rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500" />

                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Icon placeholder */}
                  <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">★</span>
                    </div>
                  </div>

                  {/* Animated Counter */}
                  <motion.div
                    key={`${stat.label}-${counts[stat.label]}`}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-primary-orange mb-4"
                  >
                    {counts[stat.label] || 0}
                    {stat.value.includes("+") && "+"}
                    {stat.value.includes("%") && "%"}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional trust indicators */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
