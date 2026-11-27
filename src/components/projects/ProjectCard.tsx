import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Artwork from '../artwork/Artwork';
import TagList from '../ui/TagList';
import type { Project } from '../../types/project';

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link to={`/projects/${p.slug}`} className="project-card reveal">
      <Artwork type={p.art} />
      <div className="project-meta">
        <span>{p.category}</span>
        <span>
          VIEW PROJECT <Plus size={14} />
        </span>
      </div>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <TagList items={p.stack} />
    </Link>
  );
}
