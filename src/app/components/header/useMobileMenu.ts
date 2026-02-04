import { useState, useCallback } from 'react';

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};
