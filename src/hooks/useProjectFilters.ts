import { useState } from 'react';
import { projects, projectCategories } from '../data/projects';

export default function useProjectFilters() {
  const [category, setCategory] = useState<string>(projectCategories[0]);
  const [query, setQuery] = useState('');
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = category === projectCategories[0] || project.category === category;
    const searchableText = `${project.name} ${project.short} ${project.description} ${project.stack.join(' ')}`;
    return matchesCategory && searchableText.toLowerCase().includes(query.toLowerCase());
  });
  function resetFilters() {
    setCategory(projectCategories[0]);
    setQuery('');
  }
  return { category, setCategory, query, setQuery, filteredProjects, resetFilters };
}
