import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';
import useProjectFilters from '../hooks/useProjectFilters';

export default function ProjectsPage() {
  const { category, setCategory, query, setQuery, filteredProjects, resetFilters } =
    useProjectFilters();
  return (
    <section className="container page">
      <p className="eyebrow">SELECTED WORK / OPEN SOURCE</p>
      <h1>
        Built with intent.
        <br />
        <span className="serif">Made to work.</span>
      </h1>
      <p className="page-intro">
        A collection of explorations and applications across AI, full-stack engineering, and the
        systems that connect them.
      </p>
      <ProjectFilters
        category={category}
        query={query}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
      />
      <p className="result-count" aria-live="polite">
        {filteredProjects.length} projects
      </p>
      <div className="project-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <div className="empty">
          <h3>No projects found.</h3>
          <p>Try another keyword or category.</p>
          <button className="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
