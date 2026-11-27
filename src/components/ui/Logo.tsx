import { Link } from 'react-router-dom';

interface LogoProps {
  showName?: boolean;
}

export default function Logo({ showName = false }: LogoProps) {
  return (
    <Link to="/" className="logo" aria-label="Ronnie Galindo home">
      <span className="logo-avatar">
        <img
          src={`${import.meta.env.BASE_URL}images/ronnie-office-portrait.png`}
          alt=""
          width={52}
          height={52}
          decoding="async"
        />
      </span>
      {showName && <span className="logo-name">Ronnie Galindo</span>}
    </Link>
  );
}
