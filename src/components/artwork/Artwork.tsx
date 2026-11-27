import { useRef } from 'react';
import { Layers } from 'lucide-react';
import type { ArtworkVariant } from '../../types/project';

export default function Artwork({
  type = 'orb',
  className = '',
}: {
  type?: ArtworkVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`art art-${type} ${className}`}
      aria-hidden="true"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) / 22}px`);
        ref.current?.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) / 22}px`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--mx', '0px');
        ref.current?.style.setProperty('--my', '0px');
      }}
    >
      <div className="art-grid" />
      {type === 'orb' ? (
        <>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="sphere">
            {Array.from({ length: 19 }, (_, i) => (
              <i key={i} style={{ transform: `rotateY(${i * 10}deg)` }} />
            ))}
          </div>
          <div className="orb-label label-top">HUMAN IDEAS</div>
          <div className="orb-label label-bottom">INTELLIGENT SYSTEMS</div>
          <span className="coord">32.9346° N / 97.2517° W</span>
        </>
      ) : type === 'audio' ? (
        <div className="waveform">
          {Array.from({ length: 42 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${18 + Math.abs(Math.sin(i * 0.72)) * 68}%`,
                animationDelay: `${i * -0.09}s`,
              }}
            />
          ))}
        </div>
      ) : type === 'vision' ? (
        <>
          <div className="vision-road" />
          <div className="track t1">
            <span>CYCLIST · 0.98</span>
          </div>
          <div className="track t2">
            <span>VEHICLE · 0.96</span>
          </div>
          <div className="scan" />
        </>
      ) : type === 'network' ? (
        <div className="network">
          <div className="network-core">
            <Layers size={36} />
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} style={{ transform: `rotate(${i * 60}deg)` }}>
              <b />
            </i>
          ))}
        </div>
      ) : (
        <div className="tiles">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * -0.25}s` }} />
          ))}
        </div>
      )}
    </div>
  );
}
