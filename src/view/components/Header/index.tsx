import { useState } from 'react';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#8B1513]">
      <NavBar setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
