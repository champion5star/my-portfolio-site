import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const topology = JSON.parse(readFileSync(require.resolve('world-atlas/land-110m.json'), 'utf8'));
const land = feature(topology, topology.objects.land);
writeFileSync(new URL('../src/data/worldLand.json', import.meta.url), JSON.stringify(land));
console.log('Generated globe land geometry from world-atlas / Natural Earth (public domain).');
