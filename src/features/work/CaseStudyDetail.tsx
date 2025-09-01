import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const CaseStudyDetail = () => {
  const { caseStudyId } = useParams();

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
            Case Study Details
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Detailed information about {caseStudyId} case study.
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Case study detail page is under development. Coming soon with
            comprehensive project information, results, and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/work" className="btn-secondary inline-flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Work
            </Link>
            <Link to="/" className="btn-primary inline-flex items-center">
              Back to Home
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyDetail;
