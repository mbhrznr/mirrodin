import matter from "gray-matter";
import { createClient } from "redis";
import type { RediSearchSchema, SchemaFieldTypes } from "redis";
import { remark } from "remark";
import gfm from "remark-gfm";

import settings from "~/mirrodin.settings.json" assert { type: "json" };
import cache from "~/lib/cache/cache";
import get from "~/utils/get";
import group from "~/utils/group";
import transform from "~/utils/transform";

type Settings = typeof settings;

export const INDEX_KEY = "idx:docs";

/**
 * setDocument.
 *
 * sets a (md) document in redis.
 * sets a (md) document in cache.
 */
export async function setDocument(
  redis: Awaited<ReturnType<typeof createRedis>>,
  slug: string,
  document: string
) {
  const { content, data: meta } = matter(document);
  const ast = remark().use(gfm).parse(content);

  const elements = new Map();
  const frontmatter = new Map();

  for (const [element, object] of Object.entries(settings.elements)) {
    const result = group(get(ast, element));

    const values = Object.entries(object).reduce((values, [key, { type }]) => {
      values[key] = transform(result[key], type as SchemaFieldTypes);

      return values;
    }, {} as Record<string, unknown>);

    elements.set(element, values);
  }

  for (const [key, { type }] of Object.entries(settings.frontmatter)) {
    if (key in meta) {
      frontmatter.set(key, transform(meta[key], type as SchemaFieldTypes));
    }
  }

  await redis.json.set(`docs:${slug}`, ".", {
    ...Object.fromEntries(elements),
    ...Object.fromEntries(frontmatter),
  });

  cache.set(slug, { content, meta });
}

/**
 * deleteDocument.
 *
 * deletes a (md) document in redis.
 * deletes a (md) document in cache.
 */
export async function deleteDocument(
  redis: Awaited<ReturnType<typeof createRedis>>,
  slug: string
) {
  await redis.del(`docs:${slug}`);

  cache.delete(slug);
}

/**
 * createIndexForElements.
 *
 * creates the index for the elements schema.
 * applies schema provided by `mirrodin.settings.json`.
 */
function createIndexForElements(s: Settings["elements"]) {
  const settings = Object.entries(s).reduce((settings, [element, values]) => {
    const subsettings = Object.entries(values).reduce(
      (subsettings, [key, { alias, type }]) => {
        // @ts-ignore - `SchemaFieldTypes.VECTOR` is unused and currently not supported
        subsettings[`$.${element}.${key}`] = { AS: alias, type };

        return subsettings;
      },
      {} as RediSearchSchema
    );

    return { ...settings, ...subsettings };
  }, {} as RediSearchSchema);

  return settings;
}

/**
 * createIndexForFrontmatter.
 *
 * creates the index for the frontmatter schema.
 * applies schema provided by `mirrodin.settings.json`.
 */
function createIndexForFrontmatter(s: Settings["frontmatter"]) {
  const settings = Object.entries(s).reduce(
    (settings, [key, { alias, type }]) => {
      // @ts-ignore - `SchemaFieldTypes.VECTOR` is unused and currently not supported
      settings[`$.${key}`] = { AS: alias, type };

      return settings;
    },
    {} as RediSearchSchema
  );

  return settings;
}

/**
 * createRedis.
 *
 * creates a redis client.
 * creates the index if it doesn't exist.
 */
async function createRedis() {
  const client = createClient();

  try {
    await client.connect();
    await client.ft.dropIndex(INDEX_KEY);
  } catch {}

  await client.ft.create(
    INDEX_KEY,
    {
      ...createIndexForElements(settings.elements),
      ...createIndexForFrontmatter(settings.frontmatter),
    },
    { ON: "JSON", PREFIX: "docs" }
  );

  return client;
}

const redis = await createRedis();

export default redis;
