// ── Array ─────────────────────────────────────────────────────────────────────

/** Moves an element from `fromIndex` to `toIndex` in a new array. */
export function reorder<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/** Maps over an array and removes any null/undefined results in one pass. */
export function mapCompact<T, U>(
  list: T[],
  fn: (item: T) => U | null | undefined,
): NonNullable<U>[] {
  const result: NonNullable<U>[] = [];
  for (const item of list) {
    const value = fn(item);
    if (value != null) {
      result.push(value as NonNullable<U>);
    }
  }
  return result;
}

/** Returns a new array excluding all occurrences of the given values. */
export function without<T>(list: T[], ...values: T[]): T[] {
  const excluded = new Set(values);
  return list.filter((item) => !excluded.has(item));
}

/** Returns the last element of an array, or `undefined` if empty. */
export function last<T>(list: T[]): T | undefined {
  return list[list.length - 1];
}

/** Returns a new array with the element at `index` replaced by `updater(element)`. */
export function updateAt<T>(
  list: T[],
  index: number,
  updater: (item: T) => T,
): T[] {
  return list.map((item, i) => (i === index ? updater(item) : item));
}

/** Returns a new array with the element at `index` removed. */
export function removeAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

// ── Object ────────────────────────────────────────────────────────────────────

/** Returns the first key of `record` whose value satisfies `predicate`, or `undefined`. */
export function findKey<V>(
  record: Record<string, V>,
  predicate: (value: V, key: string) => boolean,
): string | undefined {
  for (const [key, value] of Object.entries(record)) {
    if (predicate(value, key)) {
      return key;
    }
  }
  return undefined;
}

/** Returns a shallow copy of `record` without the specified `keys`. */
export function omit<V>(
  record: Record<string, V>,
  keys: string[],
): Record<string, V> {
  const result = { ...record };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

// ── Crypto ────────────────────────────────────────────────────────────────────

/** Generates a unique identifier using the native Web Crypto API. */
export function generateId(): string {
  return crypto.randomUUID();
}

// ── Function ──────────────────────────────────────────────────────────────────

/**
 * A no-operation function. Use as a safe default value for optional callbacks.
 * @example const Button = ({ onClick = noop }) => <button onClick={onClick} />;
 */
export const noop = (): void => {};
