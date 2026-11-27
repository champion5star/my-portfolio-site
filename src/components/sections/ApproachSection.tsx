import { Link } from 'react-router-dom';
import { Cpu, Code2, Layers, Plus } from 'lucide-react';

export default function ApproachSection() {
  return (
    <section className="container section approach">
      <div className="reveal">
        <p className="eyebrow">ENGINEERING, END TO END</p>
        <h2>
          Curiosity drives it.
          <br />
          <em>Craft delivers it.</em>
        </h2>
        <p className="muted prose">
          I connect the pieces that turn an idea into a product: intelligent models, dependable
          services, and interfaces that feel natural to use.
        </p>
        <Link to="/experience" className="text-link">
          Explore my experience <Plus size={16} />
        </Link>
      </div>
      <div className="capabilities">
        {[
          {
            icon: Cpu,
            title: 'Applied intelligence',
            text: 'LLMs, RAG, computer vision, and speech systems built for practical use.',
          },
          {
            icon: Code2,
            title: 'Full-stack craft',
            text: 'Thoughtful React interfaces connected to reliable Python and Node.js services.',
          },
          {
            icon: Layers,
            title: 'Systems that scale',
            text: 'Containerized infrastructure, efficient inference, and automated delivery.',
          },
        ].map((c) => (
          <div className="capability reveal" key={c.title}>
            <c.icon />
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
