import { motion } from "framer-motion";
import { ArrowRight, Play, Star as StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("stats-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-navy via-primary-navy to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute top-20 left-20 w-2 h-2 bg-primary-orange rounded-full opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 1 }}
          className="absolute top-40 right-32 w-1 h-1 bg-primary-orange rounded-full opacity-40"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 2 }}
          className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-primary-orange rounded-full opacity-50"
        />

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-orange/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-primary-orange/10 border border-primary-orange/20 rounded-full text-primary-orange text-sm font-medium"
            >
              <span className="w-2 h-2 bg-primary-orange rounded-full mr-2 animate-pulse" />
              Innovation at its finest
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            >
              Powering your brand with a{" "}
              <span className="gradient-text">QuadraCore</span> of innovation.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              We transform businesses through cutting-edge web development,
              stunning design, and strategic digital marketing solutions that
              drive real results.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-4 group"
              >
                Get Proposal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/work"
                className="btn-secondary text-lg px-8 py-4 group"
              >
                See Our Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>100+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>95% Client Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual/Video */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            {/* Video Preview Card */}
            <div className="relative w-full max-w-lg">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
                {/* Mock Video Interface */}
                <div className="bg-black rounded-xl aspect-video mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-gray-400 text-sm">Watch Our Story</p>
                  </div>
                </div>

                {/* Video Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    QuadraCore in Action
                  </h3>
                  <p className="text-gray-400 text-sm">
                    See how we've transformed businesses and delivered
                    exceptional results for our clients.
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>2:45 min</span>
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary-orange/20 rounded-full flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [5, -5, 5],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">★</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors duration-300 group"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <StarIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
