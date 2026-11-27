import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { projects } from '../../data/projects';
import ProjectCard from '../projects/ProjectCard';

export default function SelectedWorkSection() {
  return (
    <section className="container section">
      <div className="section-top reveal">
        <div>
          <p className="eyebrow">A FEW THINGS I’VE BUILT</p>
          <h2>
            Ideas, made <em>real.</em>
          </h2>
        </div>
        <Link className="text-link" to="/projects">
          All projects <Plus size={16} />
        </Link>
      </div>
      <div className="project-grid">
        {projects.slice(0, 2).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
