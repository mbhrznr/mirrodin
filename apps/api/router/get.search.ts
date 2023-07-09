import type { RequestHandler } from "express";

import cache from "~/lib/cache/cache";
import type { CacheValue } from "~/lib/cache/cache";
import redis, { INDEX_KEY } from "~/lib/redis/redis";
import lowercase from "~/utils/lowercase";
import normalize from "~/utils/normalize";

type Params = {};
type ResponseBody =
  | { docs: { meta: CacheValue["meta"]; slug: string }[]; total: number }
  | { message: string; name: string };
type RequestBody = {};
type QueryParams = { q?: string };

/**
 * [get] `/search`.
 *
 * searches redis for docs matching the query.
 * returns all matching docs from (in-memory) cache.
 */
export default (async function search(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.json({ docs: [], total: 0 }).status(200);
  }

  try {
    const { documents } = await redis.ft.search(INDEX_KEY, q);
    const slugs = documents.map(({ id }) => normalize(id));
    const docs = [...cache.entries()]
      .filter(([slug]) => slugs.includes(slug))
      .map(([slug, { meta }]) => ({
        meta,
        slug,
      }));

    return res.json({ docs, total: docs.length }).status(200);
  } catch (error) {
    return res.status(500).json({
      message: lowercase((error as Error).message),
      name: lowercase((error as Error).name),
    });
  }
} satisfies RequestHandler<Params, ResponseBody, RequestBody, QueryParams>);
