import React from "react";
import { Link } from "react-router-dom";
import styles from "../CustomerPortal.module.scss";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>M</div>
              <span className={styles.footerLogoText}>MLM Portal</span>
            </div>
            <p className={styles.footerTagline}>
              Start earning with transparent income plans
            </p>
          </div>

          <div className={styles.footerMiddle}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Product</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/customer">Home</Link>
                </li>
                <li>
                  <Link to="#how-it-works">How it Works</Link>
                </li>
                <li>
                  <Link to="/customer/plans">Packages</Link>
                </li>
                <li>
                  <Link to="/customer/plans">Pricing</Link>
                </li>
                <li>
                  <Link to="#leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Company</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Support</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link to="/customer/faq">FAQ</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.newsletterSignup}>
              <h4 className={styles.newsletterTitle}>Stay Updated</h4>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Linkedin className={styles.socialIcon} />
              </a>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>support@mlmportal.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © 2024 MLM Portal. All rights reserved.
            </p>
            <div className={styles.footerBottomLinks}>
              <a href="/legal">Legal</a>
              <a href="/disclaimer">Disclaimer</a>
              <span className={styles.earningsNote}>
                Earnings depend on network activity. See Terms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
