import { Link } from 'react-router-dom';
import PortraitButton from './PortraitButton';

interface LogoProps {
  showName?: boolean;
}

export default function Logo({ showName = false }: LogoProps) {
  return (
    <div className="logo">
      <PortraitButton />
      {showName && (
        <Link to="/" className="logo-name" aria-label="Ronnie Galindo home">
          Ronnie Galindo
        </Link>
      )}
    </div>
  );
}
