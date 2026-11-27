import { useId, useMemo } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { aiConnections, aiHubs } from '../../data/aiNetwork';
import {
  connectionPath,
  connectionPoint,
  globePaths,
  projectGlobePoint,
} from '../../lib/globeGeometry';
import type { AiHub, AiLayer } from '../../types/globe';

interface GlobeSceneProps {
  rotation: number;
  time: number;
  layer: AiLayer;
  selectedHub: string | null;
  onHubSelect: (hub: AiHub) => void;
  onPointerDown: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (event: PointerEvent<SVGSVGElement>) => void;
  onPointerUp: (event: PointerEvent<SVGSVGElement>) => void;
  onKeyDown: (event: KeyboardEvent<SVGSVGElement>) => void;
}

export default function GlobeScene({
  rotation,
  time,
  layer,
  selectedHub,
  onHubSelect,
  ...interactions
}: GlobeSceneProps) {
  const id = useId().replace(/:/g, '');
  const frame = useMemo(() => globePaths(rotation), [rotation]);
  const routes = aiConnections.filter(
    (connection) => layer === 'all' || connection.layer === layer,
  );
  const activeHubs = new Set(
    routes.flatMap((connection) => [connection.from.id, connection.to.id]),
  );

  return (
    <svg
      className="ai-globe-scene"
      viewBox="0 0 600 550"
      role="group"
      aria-label="Interactive Earth showing illustrative AI connections"
      aria-describedby={`${id}-instructions`}
      tabIndex={0}
      {...interactions}
      onPointerCancel={interactions.onPointerUp}
    >
      <title>A world connected by artificial intelligence</title>
      <desc id={`${id}-instructions`}>
        Drag to rotate, or use the left and right arrow keys. Select a glowing hub to explore its
        connections. This network is an illustration, not live activity.
      </desc>
      <defs>
        <radialGradient id={`${id}-ocean`} cx="35%" cy="25%" r="80%">
          <stop stopColor="#24494c" />
          <stop offset=".52" stopColor="#102c31" />
          <stop offset="1" stopColor="#071719" />
        </radialGradient>
        <radialGradient id={`${id}-shade`} cx="32%" cy="24%" r="78%">
          <stop offset=".2" stopColor="#b9ecab" stopOpacity=".06" />
          <stop offset=".65" stopColor="#061416" stopOpacity="0" />
          <stop offset="1" stopColor="#020c10" stopOpacity=".75" />
        </radialGradient>
        <radialGradient id={`${id}-halo`}>
          <stop offset=".72" stopColor="#8be5c6" stopOpacity="0" />
          <stop offset=".84" stopColor="#8be5c6" stopOpacity=".12" />
          <stop offset=".9" stopColor="#8be5c6" stopOpacity=".02" />
          <stop offset="1" stopColor="#8be5c6" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".8" fill="#b5db98" fillOpacity=".45" />
        </pattern>
        <clipPath id={`${id}-land`}>
          <path d={frame.land} />
        </clipPath>
      </defs>
      <g aria-hidden="true">
        <circle cx="300" cy="270" r="245" fill={`url(#${id}-halo)`} />
        <ellipse
          className="ai-orbit-guide"
          cx="300"
          cy="270"
          rx="256"
          ry="84"
          transform="rotate(-24 300 270)"
        />
        <ellipse
          className="ai-orbit-guide ai-orbit-secondary"
          cx="300"
          cy="270"
          rx="248"
          ry="109"
          transform="rotate(55 300 270)"
        />
        <circle cx="300" cy="270" r="204" className="ai-atmosphere" />
        <circle cx="300" cy="270" r="202" fill={`url(#${id}-ocean)`} />
        <path d={frame.grid} className="ai-graticule" />
        <path d={frame.land} className="ai-land" />
        <rect
          x="97"
          y="67"
          width="406"
          height="406"
          fill={`url(#${id}-dots)`}
          clipPath={`url(#${id}-land)`}
        />
        <circle cx="300" cy="270" r="202" fill={`url(#${id}-shade)`} />
        {routes.map((connection, index) => {
          const key = `${connection.from.id}-${connection.to.id}`;
          const path = connectionPath(connection, rotation, frame.projection);
          const highlighted =
            !selectedHub || connection.from.id === selectedHub || connection.to.id === selectedHub;
          return (
            <g
              key={key}
              className={`ai-route ai-${connection.layer}`}
              opacity={highlighted ? 1 : 0.13}
            >
              <path d={path} className="ai-route-base" />
              <path
                d={path}
                className="ai-route-flow"
                style={{ animationDelay: `${index * -0.24}s` }}
              />
              {[0, 0.5].map((offset) => {
                const point = connectionPoint(
                  connection,
                  (time * 0.24 + index * 0.17 + offset) % 1,
                  rotation,
                  frame.projection,
                );
                return point.visible ? (
                  <circle key={offset} cx={point.x} cy={point.y} r="2.4" className="ai-packet" />
                ) : null;
              })}
            </g>
          );
        })}
      </g>
      {aiHubs.map((hub) => {
        const point = projectGlobePoint(hub.coordinates, rotation, 0, frame.projection);
        if (!point.visible || !activeHubs.has(hub.id)) return null;
        const selected = selectedHub === hub.id;
        return (
          <g
            key={hub.id}
            transform={`translate(${point.x},${point.y})`}
            className={`ai-hub ${selected ? 'is-selected' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${hub.name} AI connections`}
            aria-pressed={selected}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onHubSelect(hub)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                onHubSelect(hub);
              }
            }}
          >
            <title>{hub.name}</title>
            <circle r="14" className="ai-hub-hit" />
            <circle r="10" className="ai-hub-pulse" />
            <circle r="4" className="ai-hub-core" />
            {(selected || hub.id === 'texas' || hub.id === 'london' || hub.id === 'singapore') && (
              <text x="10" y="-11" className="ai-hub-label">
                {hub.name.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
