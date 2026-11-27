import TagList from '../components/ui/TagList';
import PortraitButton from '../components/ui/PortraitButton';
import { skillGroups } from '../data/profile';
import { Download } from 'lucide-react';
import ContactBanner from '../components/sections/ContactBanner';
import { resumeUrl } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <section className="container page">
        <p className="eyebrow">THE PERSON BEHIND THE CODE</p>
        <div className="about-heading">
          <h1>
            A builder’s mind.
            <br />
            <span className="serif">A curious spirit.</span>
          </h1>
          <figure className="about-portrait">
            <PortraitButton variant="profile" />
            <figcaption>KELLER, TEXAS</figcaption>
          </figure>
        </div>
        <div className="about-body reveal">
          <p className="large-copy">
            I’m Ronnie, a Senior AI & Full Stack Engineer who enjoys turning ambitious ideas into
            software people can actually use.
          </p>
          <div className="prose muted">
            <p>
              My work sits at the intersection of AI engineering, backend architecture, and
              full-stack development. I build the connections between machine-learning models,
              scalable APIs, data pipelines, and user-facing applications.
            </p>
            <p>
              Over 8+ years in software development, including 4+ years building AI-powered
              applications, I’ve worked across conversational analytics, document intelligence,
              computer vision, and neural speech synthesis.
            </p>
            <p>
              I care about what happens after the prototype: performance, reliability,
              maintainability, and the people using the product. I also enjoy mentoring engineers
              and sharing what I learn.
            </p>
            <a href={resumeUrl} className="button" download>
              Download resume <Download size={17} />
            </a>
          </div>
        </div>
        <div className="stats reveal">
          <div>
            <strong>8+</strong>
            <span>Years building software</span>
          </div>
          <div>
            <strong>4+</strong>
            <span>Years in applied AI</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>Production applications</span>
          </div>
        </div>
        <section className="section">
          <p className="eyebrow">THE TOOLBOX</p>
          <h2>
            Different tools.
            <br />
            <em>One connected approach.</em>
          </h2>
          <div className="skill-grid">
            {skillGroups.map((s) => (
              <div className="skill-group reveal" key={s.title}>
                <h3>{s.title}</h3>
                <TagList items={s.items} />
              </div>
            ))}
          </div>
        </section>
        <section className="education reveal">
          <p className="eyebrow">EDUCATION</p>
          <h3>Computer Science</h3>
          <p>University of North Texas · Bachelor’s degree · 2013–2017</p>
          <h3>Human Resource Management</h3>
          <p>Harvard University · Bachelor’s degree · 2008–2012</p>
        </section>
      </section>
      <ContactBanner />
    </>
  );
}
