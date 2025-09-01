import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { NAVIGATION } from "../constants";
import { useStickyHeader } from "../hooks/useScrollAnimation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, isDark, toggleTheme, setTheme } = useDarkMode();
  const isSticky = useStickyHeader(100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky || isScrolled
            ? "bg-white/90 dark:bg-primary-navy/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary-orange rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold text-primary-navy dark:text-white group-hover:text-primary-orange transition-colors duration-300">
                QuadraCore
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                    location.pathname === item.href
                      ? "text-primary-orange"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-orange"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-orange"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right side - Theme toggle and CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="relative">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </button>

                {/* Theme dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => setTheme("light")}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                        theme === "light"
                          ? "bg-primary-orange text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-primary-orange text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                        theme === "system"
                          ? "bg-primary-orange text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      System
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/contact" className="btn-primary text-sm px-6 py-2.5">
                Get Proposal
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-primary-navy z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-primary-navy dark:text-white">
                    Menu
                  </span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6 space-y-4">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-300 ${
                        location.pathname === item.href
                          ? "bg-primary-orange text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        theme === "light"
                          ? "bg-primary-orange text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Sun className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-primary-orange text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Moon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-2 rounded-lg transition-colors duration-300 ${
                        theme === "system"
                          ? "bg-primary-orange text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile CTA */}
                  <Link
                    to="/contact"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full text-center"
                  >
                    Get Proposal
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
