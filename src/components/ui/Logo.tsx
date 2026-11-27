import { Link } from 'react-router-dom';

interface LogoProps {
  showName?: boolean;
}

export default function Logo({ showName = false }: LogoProps) {
  return (
    <Link to="/" className="logo" aria-label="Ronnie Galindo home">
      rg<span>.</span>
      {showName && <span className="logo-name">RONNIE GALINDO</span>}
    </Link>
  );
}
