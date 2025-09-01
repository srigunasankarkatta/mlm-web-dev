import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Palette, Search, Share2, Star } from "lucide-react";
import type { Service } from "../../hooks/useContent";

interface ServicesSectionProps {
  services: Service[];
  loading: boolean;
}

const ServicesSection = ({ services, loading }: ServicesSectionProps) => {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Globe: <Globe className="w-8 h-8" />,
      Palette: <Palette className="w-8 h-8" />,
      Search: <Search className="w-8 h-8" />,
      Share2: <Share2 className="w-8 h-8" />,
      Star: <Star className="w-8 h-8" />,
    };
    return iconMap[iconName] || <Globe className="w-8 h-8" />;
  };

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
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-80 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
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
            Comprehensive Digital Solutions
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From web development to digital marketing, we offer end-to-end
            solutions that help businesses thrive in the digital landscape.
          </motion.p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services && services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Link to={`/services/${service.id}`}>
                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:border-primary-orange/20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-primary-orange/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="text-primary-orange">
                          {getIconComponent(service.icon)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-orange transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features preview */}
                      <div className="space-y-2">
                        {service.features
                          .slice(0, 3)
                          .map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-primary-orange rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        {service.features.length > 3 && (
                          <div className="text-sm text-primary-orange font-medium">
                            +{service.features.length - 3} more features
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-primary-orange font-semibold group-hover:translate-x-1 transition-transform duration-300">
                          Learn More
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary-orange group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No services available at the moment.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="btn-secondary text-lg px-8 py-4 group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
