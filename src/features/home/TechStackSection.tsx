import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TechStackSectionProps {
  technologies: readonly string[];
}

const TechStackSection = ({ technologies }: TechStackSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
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
            Cutting-Edge Technology Stack
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We leverage the latest technologies and frameworks to build
            scalable, performant, and future-proof digital solutions.
          </motion.p>
        </motion.div>

        {/* Technology Categories */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Frontend */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Frontend
              </h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-primary-orange/10 text-primary-orange text-sm rounded-full">
                  React
                </span>
                <span className="inline-block px-3 py-1 bg-primary-orange/10 text-primary-orange text-sm rounded-full">
                  Next.js
                </span>
                <span className="inline-block px-3 py-1 bg-primary-orange/10 text-primary-orange text-sm rounded-full">
                  TypeScript
                </span>
              </div>
            </div>

            {/* Backend */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Backend
              </h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">
                  Laravel
                </span>
                <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">
                  Node.js
                </span>
                <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">
                  Python
                </span>
              </div>
            </div>

            {/* Database */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Database
              </h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">
                  MySQL
                </span>
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">
                  MongoDB
                </span>
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">
                  Redis
                </span>
              </div>
            </div>

            {/* Cloud */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Cloud
              </h3>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">
                  AWS
                </span>
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">
                  Azure
                </span>
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">
                  Docker
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technology Marquee */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden"
        >
          <div className="flex space-x-12 animate-marquee hover:pause">
            {/* First set of technologies */}
            {technologies.map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-600 group-hover:border-primary-orange/50">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm text-center px-2 group-hover:text-primary-orange transition-colors duration-300">
                      {tech}
                    </span>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {technologies.map((tech, index) => (
              <div
                key={`${tech}-duplicate-${index}`}
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-600 group-hover:border-primary-orange/50">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm text-center px-2 group-hover:text-primary-orange transition-colors duration-300">
                      {tech}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technology Benefits */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Performance
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Optimized for speed and scalability
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔒</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Security
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enterprise-grade security standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📱</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Responsive
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Works perfectly on all devices
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
