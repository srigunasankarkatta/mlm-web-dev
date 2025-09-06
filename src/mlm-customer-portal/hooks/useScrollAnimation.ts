import { useEffect, useState, useRef } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    delay?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = false,
        delay = 0
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const [scrollProgress, setScrollProgress] = useState(0);
    const elementRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(currentScrollY / documentHeight, 1);

            setScrollY(currentScrollY);
            setScrollProgress(progress);
            setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold, rootMargin, triggerOnce, delay]);

    return {
        isVisible,
        scrollY,
        scrollDirection,
        scrollProgress,
        elementRef
    };
};

export const useParallaxScroll = (speed: number = 0.5) => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY * speed);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return offsetY;
};

export const useMomentumScroll = () => {
    const [velocity, setVelocity] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const lastScrollTime = useRef(Date.now());
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            const timeDiff = now - lastScrollTime.current;
            const scrollDiff = window.scrollY - lastScrollY.current;

            if (timeDiff > 0) {
                const currentVelocity = scrollDiff / timeDiff;
                setVelocity(currentVelocity);
                setIsScrolling(Math.abs(currentVelocity) > 0.1);
            }

            lastScrollTime.current = now;
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { velocity, isScrolling };
};

