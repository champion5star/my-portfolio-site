import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function ContactBanner() {
  return (
    <section className="contact-banner container reveal">
      <p className="eyebrow">LET’S BUILD SOMETHING THAT MATTERS</p>
      <div>
        <h2>
          Your next idea.
          <br />
          <em>Our next conversation.</em>
        </h2>
        <Link to="/contact" className="button primary">
          Get in touch <Plus size={18} />
        </Link>
      </div>
    </section>
  );
}
