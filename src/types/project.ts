export type ArtworkVariant = 'orb' | 'audio' | 'vision' | 'network' | 'tiles';

export interface Project {
  slug: string;
  name: string;
  repo: string;
  category: string;
  short: string;
  description: string;
  stack: string[];
  art: ArtworkVariant;
  details: string;
  features: string[];
  tools: string;
}
