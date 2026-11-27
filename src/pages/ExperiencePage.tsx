import { experiences } from '../data/experience';
import ExperienceEntry from '../components/experience/ExperienceEntry';
import { Download } from 'lucide-react';
import ContactBanner from '../components/sections/ContactBanner';
import { resumeUrl } from '../data/site';

export default function ExperiencePage() {
  return (
    <>
      <section className="container page">
        <p className="eyebrow">THE JOURNEY SO FAR</p>
        <h1>
          Complex problems.
          <br />
          <span className="serif">Practical impact.</span>
        </h1>
        <p className="page-intro">
          Building AI-powered products, improving the systems behind them, and helping teams deliver
          with confidence.
        </p>
        <div className="timeline">
          {experiences.map((experience) => (
            <ExperienceEntry key={experience.company} experience={experience} />
          ))}
        </div>
        <a className="button primary" href={resumeUrl} download>
          Get the full resume <Download size={18} />
        </a>
      </section>
      <ContactBanner />
    </>
  );
}
