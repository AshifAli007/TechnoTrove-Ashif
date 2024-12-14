import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation(); // Hook to access the location object

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Effect will run every time location changes

  return null;
}

export default ScrollToTop;
