import type { AiConnection, AiHub, AiLayer } from '../types/globe';

export const aiLayers: { id: AiLayer; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'All AI',
    description: 'People, models, and systems. Connected across continents.',
  },
  {
    id: 'language',
    label: 'Language',
    description: 'Understanding language. Sharing knowledge across borders.',
  },
  {
    id: 'vision',
    label: 'Vision',
    description: 'Turning images into understanding, wherever life happens.',
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Connecting intelligent services to everyday work.',
  },
];

export const aiHubs: AiHub[] = [
  { id: 'texas', name: 'Texas', coordinates: [-97.25, 32.93] },
  { id: 'san-francisco', name: 'San Francisco', coordinates: [-122.42, 37.77] },
  { id: 'toronto', name: 'Toronto', coordinates: [-79.38, 43.65] },
  { id: 'sao-paulo', name: 'São Paulo', coordinates: [-46.63, -23.55] },
  { id: 'london', name: 'London', coordinates: [-0.13, 51.51] },
  { id: 'berlin', name: 'Berlin', coordinates: [13.4, 52.52] },
  { id: 'nairobi', name: 'Nairobi', coordinates: [36.82, -1.29] },
  { id: 'cape-town', name: 'Cape Town', coordinates: [18.42, -33.92] },
  { id: 'dubai', name: 'Dubai', coordinates: [55.27, 25.2] },
  { id: 'mumbai', name: 'Mumbai', coordinates: [72.88, 19.08] },
  { id: 'singapore', name: 'Singapore', coordinates: [103.82, 1.35] },
  { id: 'tokyo', name: 'Tokyo', coordinates: [139.69, 35.68] },
  { id: 'sydney', name: 'Sydney', coordinates: [151.21, -33.87] },
];

const connections: [string, string, AiConnection['layer']][] = [
  ['texas', 'london', 'language'],
  ['london', 'mumbai', 'language'],
  ['mumbai', 'singapore', 'language'],
  ['singapore', 'tokyo', 'language'],
  ['toronto', 'london', 'language'],
  ['nairobi', 'london', 'language'],
  ['san-francisco', 'tokyo', 'vision'],
  ['tokyo', 'sydney', 'vision'],
  ['sydney', 'singapore', 'vision'],
  ['berlin', 'nairobi', 'vision'],
  ['nairobi', 'cape-town', 'vision'],
  ['sao-paulo', 'cape-town', 'vision'],
  ['texas', 'san-francisco', 'automation'],
  ['texas', 'sao-paulo', 'automation'],
  ['sao-paulo', 'london', 'automation'],
  ['london', 'berlin', 'automation'],
  ['berlin', 'dubai', 'automation'],
  ['dubai', 'singapore', 'automation'],
  ['singapore', 'sydney', 'automation'],
  ['toronto', 'texas', 'automation'],
];

export const aiConnections: AiConnection[] = connections.map(([from, to, layer]) => ({
  from: aiHubs.find((hub) => hub.id === from)!,
  to: aiHubs.find((hub) => hub.id === to)!,
  layer,
}));

export const globeRegions = [
  { id: 'world', label: 'Explore the world', rotation: -15 },
  { id: 'americas', label: 'Americas', rotation: 95 },
  { id: 'europe', label: 'Europe', rotation: -15 },
  { id: 'africa', label: 'Africa', rotation: -25 },
  { id: 'asia', label: 'Asia', rotation: -105 },
  { id: 'oceania', label: 'Oceania', rotation: -145 },
];
