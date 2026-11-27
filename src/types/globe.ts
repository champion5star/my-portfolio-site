export type AiLayer = 'all' | 'language' | 'vision' | 'automation';
export type Coordinates = [longitude: number, latitude: number];

export interface AiHub {
  id: string;
  name: string;
  coordinates: Coordinates;
}

export interface AiConnection {
  from: AiHub;
  to: AiHub;
  layer: Exclude<AiLayer, 'all'>;
}
