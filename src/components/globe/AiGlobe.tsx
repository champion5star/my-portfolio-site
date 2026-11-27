import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Cpu, Pause, Play } from 'lucide-react';
import { aiLayers, globeRegions } from '../../data/aiNetwork';
import useGlobeMotion from '../../hooks/useGlobeMotion';
import type { AiHub, AiLayer } from '../../types/globe';
import GlobeScene from './GlobeScene';

export default function AiGlobe() {
  const motion = useGlobeMotion();
  const [layer, setLayer] = useState<AiLayer>('all');
  const [region, setRegion] = useState('world');
  const [hub, setHub] = useState<AiHub | null>(null);
  const drag = useRef<{ x: number; rotation: number } | null>(null);
  const selectedLayer = aiLayers.find((item) => item.id === layer)!;

  function selectHub(selected: AiHub) {
    setHub(selected);
    motion.setPaused(true);
    motion.rotateTo(-selected.coordinates[0]);
  }

  function rotate(degrees: number) {
    motion.setPaused(true);
    motion.rotateTo(motion.frame.rotation + degrees);
  }

  function onPointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX, rotation: motion.frame.rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
    motion.setDragging(true);
  }

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    const width = event.currentTarget.getBoundingClientRect().width || 600;
    motion.rotateTo(drag.current.rotation + ((event.clientX - drag.current.x) / width) * 180);
  }

  function onPointerUp(event: PointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    drag.current = null;
    motion.setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      rotate(event.key === 'ArrowLeft' ? -20 : 20);
    }
  }

  return (
    <div
      className={`ai-globe ${motion.playing ? 'is-playing' : 'is-paused'}`}
      ref={motion.containerRef}
    >
      <div className="ai-globe-heading">
        <span>
          <Cpu size={15} /> INTELLIGENCE WITHOUT BORDERS
        </span>
        <span className="ai-globe-coordinate">EARTH / AI</span>
      </div>
      <div className="ai-globe-visual">
        <GlobeScene
          rotation={motion.frame.rotation}
          time={motion.frame.time}
          layer={layer}
          selectedHub={hub?.id || null}
          onHubSelect={selectHub}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
        />
        <span className="ai-floating-label ai-floating-language">
          <i /> LANGUAGE
        </span>
        <span className="ai-floating-label ai-floating-vision">
          <i /> VISION
        </span>
        <span className="ai-floating-label ai-floating-automation">
          <i /> AUTOMATION
        </span>
        <div className="ai-globe-caption">
          ONE PLANET. <span>CONNECTED INTELLIGENCE.</span>
        </div>
      </div>
      <div className="ai-globe-layers" role="group" aria-label="Explore AI capabilities">
        {aiLayers.map((item) => (
          <button
            key={item.id}
            className={layer === item.id ? 'is-active' : ''}
            aria-pressed={layer === item.id}
            onClick={() => {
              setLayer(item.id);
              setHub(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="ai-globe-description" aria-live="polite">
        {hub
          ? `${hub.name} · Explore how ${selectedLayer.id === 'all' ? 'AI connects people and systems across continents' : `${selectedLayer.label.toLowerCase()} AI connects the world`}.`
          : selectedLayer.description}
      </p>
      <div className="ai-globe-controls">
        <label className="ai-region-select">
          <span className="sr-only">Explore a region</span>
          <select
            aria-label="Explore a region"
            value={region}
            onChange={(event) => {
              const next = globeRegions.find((item) => item.id === event.target.value)!;
              setRegion(next.id);
              setHub(null);
              motion.rotateTo(next.rotation);
              motion.setPaused(true);
            }}
          >
            {globeRegions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} />
        </label>
        <div className="ai-motion-controls">
          <button aria-label="Rotate globe west" onClick={() => rotate(-25)}>
            <ChevronLeft size={17} />
          </button>
          <button
            aria-label={motion.paused ? 'Play globe animation' : 'Pause globe animation'}
            onClick={() => {
              if (motion.paused) {
                setHub(null);
                setRegion('world');
              }
              motion.setPaused(!motion.paused);
            }}
            disabled={motion.reducedMotion}
          >
            {motion.paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button aria-label="Rotate globe east" onClick={() => rotate(25)}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
      <div className="ai-globe-footnote">
        <span>
          {motion.reducedMotion
            ? 'REDUCED MOTION · MANUAL ROTATION'
            : 'DRAG TO ROTATE · SELECT A HUB'}
        </span>
        <span>ILLUSTRATIVE NETWORK</span>
      </div>
    </div>
  );
}
