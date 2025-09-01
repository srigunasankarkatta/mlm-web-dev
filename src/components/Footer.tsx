import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { NAVIGATION, SOCIAL_LINKS, SITE_CONFIG } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-primary-navy text-white">
      <div className="container-custom">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="pt-20 pb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold">QuadraCore</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Powering your brand with a QuadraCore of innovation. We deliver
                cutting-edge digital solutions that drive business growth and
                success.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 hover:bg-primary-orange rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {/* You can map icon names to actual icon components here */}
                      <span className="text-lg">#</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm flex items-center group"
                    >
                      <Globe className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    SEO Optimization
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Social Media Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Branding & Identity
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info & Newsletter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-primary-orange flex-shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-primary-orange transition-colors duration-300"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-primary-orange flex-shrink-0" />
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="hover:text-primary-orange transition-colors duration-300"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.address}</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="pt-4">
                <h4 className="text-sm font-medium text-white mb-3">
                  Stay Updated
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-primary-orange hover:bg-orange-600 rounded-r-lg transition-colors duration-300">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-sm text-gray-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-primary-orange transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-orange transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <span className="flex items-center">
                Made with <Globe className="w-4 h-4 mx-1 text-red-500" /> by
                QuadraCore
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
