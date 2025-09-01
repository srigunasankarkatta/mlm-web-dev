import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const ProcessSection = ({ steps }: ProcessSectionProps) => {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Search: <Search className="w-6 h-6" />,
      Palette: <Palette className="w-6 h-6" />,
      Code: <Code className="w-6 h-6" />,
      Rocket: <Rocket className="w-6 h-6" />,
      TrendingUp: <TrendingUp className="w-6 h-6" />,
    };
    return iconMap[iconName] || <Search className="w-6 h-6" />;
  };

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: {
        bg: string;
        border: string;
        text: string;
        shadow: string;
      };
    } = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        border: "border-blue-200",
        text: "text-blue-600",
        shadow: "shadow-blue-500/25",
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        border: "border-purple-200",
        text: "text-purple-600",
        shadow: "shadow-purple-500/25",
      },
      green: {
        bg: "from-green-500 to-green-600",
        border: "border-green-200",
        text: "text-green-600",
        shadow: "shadow-green-500/25",
      },
      orange: {
        bg: "from-orange-500 to-orange-600",
        border: "border-orange-200",
        text: "text-orange-600",
        shadow: "shadow-orange-500/25",
      },
      red: {
        bg: "from-red-500 to-red-600",
        border: "border-red-200",
        text: "text-red-600",
        shadow: "shadow-red-500/25",
      },
    };
    return colorMap[color] || colorMap.orange;
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        {/* Header Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-primary-orange/10 text-primary-orange text-sm font-medium rounded-full mb-6"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Proven Methodology
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Our <span className="gradient-text">Proven Process</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We follow a systematic, results-driven approach that ensures every
            project is delivered on time, within budget, and exceeds your
            expectations.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Desktop Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-orange/20 via-primary-orange to-primary-orange/20 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-80 lg:space-y-0">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className={`relative flex flex-col lg:flex-row items-center mt-4 mb-40 lg:mb-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step Number and Icon */}
                  <div className="relative z-10 flex-shrink-0 mb-20 lg:mb-0">
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05 }}
                      className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg ${colors.shadow} border-4 border-white dark:border-gray-800`}
                    >
                      <div className="text-white font-bold text-3xl">
                        {step.step}
                      </div>

                      {/* Floating Icon */}
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-gray-100 dark:border-gray-700">
                        <div className={colors.text}>
                          {getIconComponent(step.icon)}
                        </div>
                      </div>
                    </motion.div>

                    {/* Connection Arrow for Mobile */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-16">
                        <div className="w-8 h-8 text-primary-orange/40">
                          <ArrowRight className="w-full h-full transform rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "lg:ml-24" : "lg:mr-24"}`}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative"
                    >
                      {/* Card Background */}
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Gradient Border Effect */}
                        <div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        />

                        {/* Content */}
                        <div className="relative">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary-orange transition-colors duration-300">
                              {step.title}
                            </h3>
                            <div
                              className={`hidden lg:block w-12 h-12 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}
                            >
                              <div className="text-white">
                                {getIconComponent(step.icon)}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                            {step.description}
                          </p>

                          {/* Step Progress */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${colors.bg} text-white text-xs font-medium rounded-full`}
                              >
                                Step {step.step}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                of {steps.length}
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="hidden lg:block w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
                                style={{
                                  width: `${(step.step / steps.length) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Benefits */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mt-24"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Our Process Works
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our methodology is designed to deliver consistent results through
              proven practices and continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Transparent Communication",
                description:
                  "Regular updates and clear communication throughout the entire process with dedicated project managers.",
              },
              {
                icon: "⚡",
                title: "Agile Methodology",
                description:
                  "Flexible approach that adapts to changing requirements and feedback, ensuring your vision is realized.",
              },
              {
                icon: "🎯",
                title: "Quality Assurance",
                description:
                  "Rigorous testing and quality checks at every stage, from development to final deployment.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-orange/10 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-orange to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {benefit.icon}
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-orange transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-orange/5 to-orange-500/5 rounded-3xl p-8 lg:p-12 border border-primary-orange/20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our proven process can help bring your vision to
              life and achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4 group">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4 group">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
