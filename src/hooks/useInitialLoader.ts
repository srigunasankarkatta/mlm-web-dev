import { useState, useEffect } from "react";

export const useInitialLoader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Set body overflow to hidden during loader
    document.body.style.overflow = "hidden";
    document.body.classList.add("loading");

    // Total animation duration: 1.6s (matching InitialLoader component)
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      setHasLoaded(true);
    }, 1600);

    return () => {
      clearTimeout(loaderTimer);
      document.body.style.overflow = "visible";
      document.body.classList.remove("loading");
    };
  }, []);

  return {
    showLoader,
    hasLoaded,
  };
};
