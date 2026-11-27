import { Link, useParams } from 'react-router-dom';
import { Github, Check, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import ExternalLink from '../components/ui/ExternalLink';
import Artwork from '../components/artwork/Artwork';
import ContactBanner from '../components/sections/ContactBanner';
import { projects } from '../data/projects';
import { github } from '../data/site';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const p = projects.find((p) => p.slug === slug);
  if (!p)
    return (
      <section className="container page">
        <h1>Project not found.</h1>
        <Link to="/projects">Browse projects</Link>
      </section>
    );
  return (
    <>
      <section className="container page project-detail">
        <Link className="text-link" to="/projects">
          All projects
        </Link>
        <p className="eyebrow detail-eyebrow">{p.category}</p>
        <h1>{p.name}</h1>
        <p className="page-intro">{p.description}</p>
        <div className="actions">
          <ExternalLink className="button primary" href={`${github}/${p.repo}`}>
            View source on GitHub <Github size={18} />
          </ExternalLink>
        </div>
        <Artwork type={p.art} />
        <div className="detail-content reveal">
          <div>
            <p className="eyebrow">THE PROJECT</p>
            <h2>{p.short}</h2>
            <p className="prose muted">{p.details}</p>
            <h3>What it explores</h3>
            <ul className="feature-list">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={17} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <p className="eyebrow">TOOLS & TECHNOLOGIES</p>
            <p>{p.tools}</p>
            <p className="eyebrow">SOURCE</p>
            <ExternalLink href={`${github}/${p.repo}`} className="text-link">
              {p.repo} <ExternalLinkIcon size={16} />
            </ExternalLink>
            <p className="small muted">
              The visuals on this page are animated illustrations of the project’s domain.
            </p>
          </aside>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
