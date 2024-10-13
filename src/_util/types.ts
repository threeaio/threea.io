export type Subset<K, T extends K> = T;

export interface Dict<T> {
  [ID: number]: T;
}

export const BEZIER_CIRCLE: 0.552284749831 = 0.552284749831;
export type Simple2DTuple = [number, number];
export type Simple2D = { x: number; y: number };
export type Simple2DLine = [Simple2D, Simple2D];
export type ColorArray = [number, number, number, number];
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
