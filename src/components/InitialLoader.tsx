import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const InitialLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Set body overflow to hidden during loader
    document.body.style.overflow = "hidden";
    document.body.classList.add("loading");

    // Total animation duration: 1.6s
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "visible";
      document.body.classList.remove("loading");
    };
  }, []);

  // Reduced motion variant
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="w-32 h-32 text-yellow-400">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main C-shaped body */}
            <path
              d="M20 20 Q50 20 80 20 Q80 50 80 80 Q50 80 20 80 Q20 50 20 20"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tail extending from bottom-right */}
            <path
              d="M80 60 Q90 70 90 80 Q85 85 80 80"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>
    );
  }

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Skip Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 z-10"
        aria-label="Skip loader"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Q Monogram */}
      <div className="relative">
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 text-yellow-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main C-shaped body - stroke draw animation */}
          <motion.path
            d="M20 20 Q50 20 80 20 Q80 50 80 80 Q50 80 20 80 Q20 50 20 20"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 0, 0.5))" }}
          />

          {/* Tail extending from bottom-right - delayed stroke draw */}
          <motion.path
            d="M80 60 Q90 70 90 80 Q85 85 80 80"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 20px rgba(255, 255, 0, 0.5))" }}
          />
        </motion.svg>

        {/* Gradient fill sweep effect */}
        <motion.div
          className="absolute inset-0 w-32 h-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="qGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <mask id="qMask">
                <path
                  d="M20 20 Q50 20 80 20 Q80 50 80 80 Q50 80 20 80 Q20 50 20 20 M80 60 Q90 70 90 80 Q85 85 80 80"
                  fill="white"
                />
              </mask>
            </defs>
            <rect
              width="100"
              height="100"
              fill="url(#qGradient)"
              mask="url(#qMask)"
            />
          </svg>
        </motion.div>

        {/* Glow pulse effect */}
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full bg-yellow-400/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.6, 0] }}
          transition={{
            delay: 1.2,
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-1/4 text-white/60 text-lg font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default InitialLoader;
