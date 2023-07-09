export type CacheKey = string;
export type CacheValue = {
  content: string;
  meta: {
    description?: string;
    tags?: string[];
  };
};

/**
 * createCache.
 *
 * creates a simple, in-memory cache.
 */
function createCache<K, V>(): Map<K, V> {
  return new Map<K, V>();
}

const cache = createCache<CacheKey, CacheValue>();

export default cache;
