export type Subset<K, T extends K> = T;

export interface Dict<T> {
  [ID: number]: T;
}

export type Vector2D = { x: number; y: number };
export type ColorArray = [number, number, number, number];
