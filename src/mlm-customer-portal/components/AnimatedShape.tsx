import React from "react";
import {
  useScrollAnimation,
  useParallaxScroll,
  useMomentumScroll,
} from "../hooks/useScrollAnimation";

interface AnimatedShapeProps {
  className?: string;
  shapeType?: "circle" | "square" | "triangle" | "hexagon";
  size?: number;
  speed?: number;
  parallaxSpeed?: number;
  delay?: number;
  scrollDirection?: "up" | "down" | "both";
}

const AnimatedShape: React.FC<AnimatedShapeProps> = ({
  className = "",
  shapeType = "circle",
  size = 60,
  speed = 1,
  parallaxSpeed = 0.3,
  delay = 0,
  scrollDirection = "both",
}) => {
  const {
    isVisible,
    scrollY,
    scrollDirection: currentDirection,
    elementRef,
  } = useScrollAnimation({
    threshold: 0.1,
    delay,
  });

  const parallaxOffset = useParallaxScroll(parallaxSpeed);
  const { velocity, isScrolling } = useMomentumScroll();

  const getShapeStyle = () => {
    const baseTransform = `translateY(${parallaxOffset}px)`;
    const scrollOffset = scrollY * speed * 0.1;
    const velocityOffset = velocity * 20;

    let directionMultiplier = 1;
    if (scrollDirection === "up" && currentDirection === "down")
      directionMultiplier = 0;
    if (scrollDirection === "down" && currentDirection === "up")
      directionMultiplier = 0;

    const rotation = (scrollY * 0.1 * directionMultiplier) % 360;
    const scale = isScrolling ? 1 + Math.abs(velocity) * 0.5 : 1;

    return {
      transform: `${baseTransform} translateY(${scrollOffset}px) rotate(${rotation}deg) scale(${scale})`,
      opacity: isVisible ? 0.8 : 0.3,
      transition: isScrolling
        ? "none"
        : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      filter: `blur(${Math.abs(velocity) * 0.5}px)`,
    };
  };

  const getShapeElement = () => {
    const style = {
      ...getShapeStyle(),
      width: `${size}px`,
      height: `${size}px`,
    };

    switch (shapeType) {
      case "circle":
        return (
          <div
            ref={elementRef}
            className={`${className} rounded-full`}
            style={style}
          />
        );
      case "square":
        return (
          <div
            ref={elementRef}
            className={`${className} rounded-lg`}
            style={style}
          />
        );
      case "triangle":
        return (
          <div
            ref={elementRef}
            className={className}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid currentColor`,
              background: "none",
            }}
          />
        );
      case "hexagon":
        return (
          <div
            ref={elementRef}
            className={className}
            style={{
              ...style,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        );
      default:
        return (
          <div
            ref={elementRef}
            className={`${className} rounded-full`}
            style={style}
          />
        );
    }
  };

  return getShapeElement();
};

export default AnimatedShape;
