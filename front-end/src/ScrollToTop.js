import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Remet la page en haut à chaque changement de route
  }, [location]);

  return null;
};

export default ScrollToTop;
