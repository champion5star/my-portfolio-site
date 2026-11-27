import type { Experience } from '../../data/experience';
import TagList from '../ui/TagList';

interface ExperienceEntryProps {
  experience: Experience;
}

export default function ExperienceEntry({ experience }: ExperienceEntryProps) {
  return (
    <article className="experience-row reveal">
      <div className="experience-date">
        {experience.period}
        <span>{experience.company}</span>
      </div>
      <div>
        <h2>
          {experience.titleLines[0]}
          <br />
          {experience.titleLines[1]}
        </h2>
        <p className="muted prose">{experience.summary}</p>
        <ul>
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <TagList items={experience.technologies} />
      </div>
    </article>
  );
}
