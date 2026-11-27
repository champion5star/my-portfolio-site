import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import type { GeoProjection } from 'd3-geo';
import type { AiConnection, Coordinates } from '../types/globe';
import worldLand from '../data/worldLand.json';

export const globeCenter: Coordinates = [300, 270];
export const globeRadius = 202;
const graticule = geoGraticule10();
const land = worldLand as FeatureCollection;
const interpolators = new WeakMap<AiConnection, ReturnType<typeof geoInterpolate>>();

export function createGlobeProjection(rotation: number) {
  return geoOrthographic()
    .translate(globeCenter)
    .scale(globeRadius)
    .rotate([rotation, -18])
    .precision(0.5);
}

export function globePaths(rotation: number) {
  const projection = createGlobeProjection(rotation);
  const path = geoPath(projection);
  return { projection, land: path(land) || '', grid: path(graticule) || '' };
}

export function projectGlobePoint(
  coordinates: Coordinates,
  rotation: number,
  altitude = 0,
  projection = createGlobeProjection(rotation),
) {
  const point = projection(coordinates)!;
  const facing = projection.invert!(globeCenter)!;
  const x = globeCenter[0] + (point[0] - globeCenter[0]) * (1 + altitude);
  const y = globeCenter[1] + (point[1] - globeCenter[1]) * (1 + altitude);
  const inFront = geoDistance(coordinates, facing) < Math.PI / 2;
  const outsideLimb = Math.hypot(x - globeCenter[0], y - globeCenter[1]) > globeRadius + 1;
  return { x, y, visible: inFront || (altitude > 0 && outsideLimb) };
}

export function connectionPoint(
  connection: AiConnection,
  progress: number,
  rotation: number,
  projection?: GeoProjection,
) {
  let interpolate = interpolators.get(connection);
  if (!interpolate) {
    interpolate = geoInterpolate(connection.from.coordinates, connection.to.coordinates);
    interpolators.set(connection, interpolate);
  }
  return projectGlobePoint(
    interpolate(progress),
    rotation,
    Math.sin(progress * Math.PI) * 0.19,
    projection,
  );
}

export function connectionPath(
  connection: AiConnection,
  rotation: number,
  projection = createGlobeProjection(rotation),
) {
  let path = '';
  let drawing = false;
  for (let step = 0; step <= 40; step++) {
    const point = connectionPoint(connection, step / 40, rotation, projection);
    if (point.visible) {
      path += `${drawing ? 'L' : 'M'}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
      drawing = true;
    } else {
      drawing = false;
    }
  }
  return path;
}
