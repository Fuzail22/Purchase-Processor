import { useState, useEffect } from "react";
const LoadingOverlay = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      {showText && (
        <p>
          If this is your first interaction with the app (or) interaction after
          15 minutes of inactivity there might be a delay of upto 2 minutes for
          my free server to start up. I appreciate your patience.
        </p>
      )}
    </div>
  );
};

export default LoadingOverlay;
