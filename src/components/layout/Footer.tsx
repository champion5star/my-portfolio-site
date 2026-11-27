import { Link } from 'react-router-dom';
import { Github, Linkedin, Send } from 'lucide-react';
import ExternalLink from '../ui/ExternalLink';
import Logo from '../ui/Logo';
import { github, linkedin } from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer container">
      <Logo />
      <p>Thoughtfully built. Always evolving.</p>
      <div>
        <ExternalLink href={github} className="icon-button">
          <Github size={19} />
          <span className="sr-only">GitHub</span>
        </ExternalLink>
        <ExternalLink href={linkedin} className="icon-button">
          <Linkedin size={19} />
          <span className="sr-only">LinkedIn</span>
        </ExternalLink>
        <Link to="/contact" className="icon-button">
          <Send size={19} />
          <span className="sr-only">Contact Ronnie</span>
        </Link>
      </div>
      <span className="copyright">© {new Date().getFullYear()} Ronnie Galindo</span>
    </footer>
  );
}
