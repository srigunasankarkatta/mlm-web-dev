import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (once = true) => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once });

    return {
        ref,
        isInView,
    };
};

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = scrollTop / docHeight;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return scrollProgress;
};

export const useParallax = (speed = 0.5) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setOffset(scrolled * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return offset;
};

export const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return scrollDirection;
};

export const useScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return scrollToTop;
};

export const useElementScrollProgress = (elementRef: React.RefObject<HTMLElement>) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const updateProgress = () => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate progress based on element position
            if (elementTop <= 0) {
                // Element is above viewport
                const scrolledPast = Math.abs(elementTop);
                const progress = Math.min(scrolledPast / elementHeight, 1);
                setProgress(progress);
            } else if (elementTop <= windowHeight) {
                // Element is entering viewport
                const progress = 1 - (elementTop / windowHeight);
                setProgress(progress);
            } else {
                // Element is below viewport
                setProgress(0);
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, [elementRef]);

    return progress;
};

export const useStickyHeader = (threshold = 100) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setIsSticky(scrolled > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isSticky;
};

export const useScrollTrigger = (triggerPoint: number) => {
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            if (scrolled >= triggerPoint && !hasTriggered) {
                setHasTriggered(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerPoint, hasTriggered]);

    return hasTriggered;
}; 