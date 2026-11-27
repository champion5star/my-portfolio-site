import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { skillBandSkills } from '../../data/profile';

export default function TechStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="tech-strip" aria-label="Technical skills" data-paused={paused}>
      <div className="tech-strip-viewport">
        <div
          className="tech-strip-track"
          style={{ animationDuration: `${skillBandSkills.length * 2}s` }}
        >
          {[false, true].map((duplicate) => (
            <ul
              className="tech-strip-group"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {skillBandSkills.map((skill) => (
                <li className="tech-strip-item" key={skill}>
                  {skill}
                  <span aria-hidden="true">✳</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="tech-strip-toggle"
        aria-label={paused ? 'Play skills animation' : 'Pause skills animation'}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </section>
  );
}
