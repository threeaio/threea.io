export type Subset<K, T extends K> = T;

export interface Dict<T> {
  [ID: number]: T;
}
