import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      <div className="container-custom py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the
            modern world.
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Services page is under development. Coming soon with detailed
            service information, pricing packages, and interactive features.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            Back to Home
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
