import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Artwork from '../artwork/Artwork';

export default function HeroSection() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-cross">✳</span> AI · FULL STACK · AUTOMATION
        </p>
        <h1>
          Human ideas.
          <br />
          Intelligent
          <br />
          <span className="serif">execution.</span>
        </h1>
        <p className="hero-intro">
          I’m Ronnie Galindo, an engineer turning complex challenges into thoughtful software. From
          the first interface to the intelligence behind it.
        </p>
        <div className="actions">
          <Link to="/projects" className="button primary">
            Explore my work <Plus size={18} />
          </Link>
          <Link to="/about" className="text-link">
            A little about me
          </Link>
        </div>
        <div className="hero-meta">
          <span>BASED IN KELLER, TEXAS</span>
          <span>BUILDING WITH PURPOSE</span>
        </div>
      </div>
      <div className="hero-art-wrap">
        <Artwork />
        <div className="art-caption">
          <span>THE INTERSECTION OF LOGIC & POSSIBILITY</span>
          <span>© RG</span>
        </div>
      </div>
    </section>
  );
}
