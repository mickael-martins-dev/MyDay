import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // Récupère l'emplacement actuel de la route

  useEffect(() => {
    window.scrollTo(0, 0); // Fait défiler vers le haut chaque fois que la route change
  }, [location]); // Réagit à chaque changement de route

  return null; // Ce composant ne rend rien
};

export default ScrollToTop;
