import { motion } from "framer-motion";
import { useServices } from "../../hooks/useContent";
import { useCaseStudies } from "../../hooks/useContent";
import { useTestimonials } from "../../hooks/useContent";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import CaseStudiesSection from "./CaseStudiesSection";
import StatsSection from "./StatsSection";
import ClientLogosSection from "./ClientLogosSection";
import ProcessSection from "./ProcessSection";
import TechStackSection from "./TechStackSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import {
  STATS,
  CLIENT_LOGOS,
  PROCESS_STEPS,
  TECH_STACK,
} from "../../constants";

const Home = () => {
  const { services, loading: servicesLoading } = useServices();
  const { caseStudies, loading: caseStudiesLoading } = useCaseStudies();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();

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
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={STATS as any} />

      {/* Services Section */}
      <ServicesSection services={services} loading={servicesLoading} />

      {/* Case Studies Section */}
      <CaseStudiesSection
        caseStudies={caseStudies}
        loading={caseStudiesLoading}
      />

      {/* Client Logos Section */}
      <ClientLogosSection logos={CLIENT_LOGOS as any} />

      {/* Process Section */}
      <ProcessSection steps={PROCESS_STEPS as any} />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={testimonials}
        loading={testimonialsLoading}
      />

      {/* Tech Stack Section */}
      <TechStackSection technologies={TECH_STACK} />

      {/* CTA Section */}
      <CTASection />
    </motion.div>
  );
};

export default Home;
