export interface DataLoader<K, V> {
  load(id: K): Promise<V>;
}
