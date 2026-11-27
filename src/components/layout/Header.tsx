import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Plus, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { navigation } from '../../data/site';

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <Logo showName />
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={menuOpen ? 'nav open' : 'nav'}
      >
        {navigation.map(({ label, path }) => (
          <NavLink key={path} to={path} end={path === '/'}>
            {label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" className="header-contact">
        Let’s talk <Plus size={16} />
      </Link>
      <button
        className="menu-toggle icon-button"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
