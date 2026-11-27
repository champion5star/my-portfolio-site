import { Github, Linkedin, Download, ExternalLink as ExternalLinkIcon, Plus } from 'lucide-react';
import ExternalLink from '../components/ui/ExternalLink';
import ContactForm from '../components/contact/ContactForm';
import { github, linkedin, resumeUrl } from '../data/site';

export default function ContactPage() {
  return (
    <section className="container page contact-page">
      <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
      <h1>
        Have something
        <br />
        <span className="serif">in mind?</span>
      </h1>
      <p className="page-intro">
        An interesting problem, a new product, or an idea worth exploring. I’d love to hear about
        it.
      </p>
      <ContactForm />
      <div className="contact-links">
        <ExternalLink href={github}>
          <Github />
          <div>
            <h3>GitHub</h3>
            <span>@champion5star</span>
          </div>
          <ExternalLinkIcon size={18} />
        </ExternalLink>
        <ExternalLink href={linkedin}>
          <Linkedin />
          <div>
            <h3>LinkedIn</h3>
            <span>Let’s connect professionally</span>
          </div>
          <ExternalLinkIcon size={18} />
        </ExternalLink>
        <a href={resumeUrl} download>
          <Download />
          <div>
            <h3>Resume</h3>
            <span>The experience, in a PDF</span>
          </div>
          <Plus size={18} />
        </a>
      </div>
      <div className="contact-note">
        <span>BASED IN KELLER, TEXAS</span>
        <p>
          Interested in generative AI, RAG, computer vision, speech AI, and scalable backend
          systems.
        </p>
      </div>
    </section>
  );
}
