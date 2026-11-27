import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useRouteEffects from '../../hooks/useRouteEffects';

export default function SiteLayout() {
  useRouteEffects();
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
