import { Search } from 'lucide-react';
import { projectCategories } from '../../data/projects';

interface ProjectFiltersProps {
  category: string;
  query: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
}

export default function ProjectFilters({
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: ProjectFiltersProps) {
  return (
    <div className="project-controls">
      <div className="filters" aria-label="Filter projects">
        {projectCategories.map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            className={category === item ? 'filter active' : 'filter'}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="search">
        <Search size={17} />
        <input
          aria-label="Search projects"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects"
        />
      </label>
    </div>
  );
}
