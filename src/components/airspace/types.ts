export interface Dot {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  trail: Array<{ x: number; y: number; age: number }>;
  size: number;
  opacity: number;
}

export type Path = Array<[{ x: number; y: number }, { x: number; y: number }]>;
