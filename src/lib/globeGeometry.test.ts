import { describe, expect, it } from 'vitest';
import {
  connectionPath,
  connectionPoint,
  createGlobeProjection,
  globeCenter,
  globePaths,
  projectGlobePoint,
} from './globeGeometry';
import type { AiConnection } from '../types/globe';

const connection: AiConnection = {
  from: { id: 'west', name: 'West', coordinates: [-30, 0] },
  to: { id: 'east', name: 'East', coordinates: [30, 0] },
  layer: 'language',
};

describe('Earth projection and connection geometry', () => {
  it('renders real land and a changing graticule as the Earth rotates', () => {
    const initial = globePaths(0);
    const rotated = globePaths(90);
    expect(initial.land.length).toBeGreaterThan(1000);
    expect(initial.grid).toContain('M');
    expect(rotated.land).not.toBe(initial.land);
    expect(rotated.grid).not.toBe(initial.grid);
    expect(rotated.land).not.toContain('NaN');
  });

  it('hides hubs on the back of the planet', () => {
    const facing = createGlobeProjection(0).invert!(globeCenter)!;
    const front = projectGlobePoint(facing, 0);
    expect(front.x).toBeCloseTo(globeCenter[0]);
    expect(front.y).toBeCloseTo(globeCenter[1]);
    expect(front.visible).toBe(true);
    expect(projectGlobePoint([facing[0] + 180, -facing[1]], 0).visible).toBe(false);
  });

  it('anchors signals to their hubs and lifts the route above the surface', () => {
    const start = connectionPoint(connection, 0, 0);
    const origin = projectGlobePoint(connection.from.coordinates, 0);
    expect(start.x).toBeCloseTo(origin.x);
    expect(start.y).toBeCloseTo(origin.y);
    expect(start.visible).toBe(origin.visible);
    expect(connectionPoint(connection, 1, 0).x).toBeCloseTo(
      projectGlobePoint(connection.to.coordinates, 0).x,
    );
    const elevated = connectionPoint(connection, 0.5, 0);
    const surface = projectGlobePoint([0, 0], 0);
    expect(Math.hypot(elevated.x - globeCenter[0], elevated.y - globeCenter[1])).toBeGreaterThan(
      Math.hypot(surface.x - globeCenter[0], surface.y - globeCenter[1]),
    );
    expect(connectionPath(connection, 0)).toMatch(/^M.+L/);
    expect(connectionPath(connection, 180)).toBe('');
  });
});
