import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import type { CaseStudy } from "../../hooks/useContent";

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  loading: boolean;
}

const CaseStudiesSection = ({
  caseStudies,
  loading,
}: CaseStudiesSectionProps) => {
  // Show only the first 3 case studies on the home page
  const featuredCaseStudies = caseStudies.slice(0, 3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-80 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Success Stories That Speak
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Discover how we've transformed businesses and delivered exceptional
            results across various industries and project types.
          </motion.p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredCaseStudies && featuredCaseStudies.length > 0 ? (
            featuredCaseStudies.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Link to={`/work/${caseStudy.id}`}>
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Image/Video Preview */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                      {/* Placeholder for actual images */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 to-blue-500/20" />

                      {/* Play button overlay for video */}
                      {caseStudy.video && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-primary-orange ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-orange text-white text-xs font-medium rounded-full">
                          {caseStudy.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>

                      {/* Client name */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                          {caseStudy.client}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-orange transition-colors duration-300 line-clamp-2">
                        {caseStudy.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {caseStudy.excerpt}
                      </p>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {Object.entries(caseStudy.metrics)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <div className="text-lg font-bold text-primary-orange">
                                {value}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {caseStudy.technologies
                          .slice(0, 3)
                          .map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        {caseStudy.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                            +{caseStudy.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-primary-orange font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                          View Case Study
                        </span>
                        <ExternalLink className="w-4 h-4 text-primary-orange group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No case studies available at the moment.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <Link to="/work" className="btn-secondary text-lg px-8 py-4 group">
            View All Case Studies
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
