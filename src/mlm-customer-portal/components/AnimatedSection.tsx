import React, { ReactNode } from "react";
import {
  useScrollAnimation,
  useParallaxScroll,
} from "../hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?:
    | "fadeInUp"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn"
    | "slideInUp";
  delay?: number;
  parallaxSpeed?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animationType = "fadeInUp",
  delay = 0,
  parallaxSpeed = 0,
  threshold = 0.1,
}) => {
  const { isVisible, scrollY, scrollDirection, elementRef } =
    useScrollAnimation({
      threshold,
      delay,
    });

  const parallaxOffset = useParallaxScroll(parallaxSpeed);

  const getAnimationStyle = () => {
    const baseStyle = {
      transform: `translateY(${parallaxOffset}px)`,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    if (!isVisible) {
      switch (animationType) {
        case "fadeInUp":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateY(50px) translateY(${parallaxOffset}px)`,
          };
        case "fadeInLeft":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateX(-50px) translateY(${parallaxOffset}px)`,
          };
        case "fadeInRight":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateX(50px) translateY(${parallaxOffset}px)`,
          };
        case "scaleIn":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `scale(0.8) translateY(${parallaxOffset}px)`,
          };
        case "slideInUp":
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateY(100px) translateY(${parallaxOffset}px)`,
          };
        default:
          return baseStyle;
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: `translateY(0) translateY(${parallaxOffset}px)`,
    };
  };

  return (
    <div ref={elementRef} className={className} style={getAnimationStyle()}>
      {children}
    </div>
  );
};

export default AnimatedSection;
