import type { RequestHandler } from "express";

import cache from "~/lib/cache/cache";
import lowercase from "~/utils/lowercase";

import type { CacheValue } from "~/lib/cache/cache";

type Params = {};
type ResponseBody =
  | { docs: { meta: CacheValue["meta"]; slug: string }[]; total: number }
  | { message: string; name: string };
type RequestBody = {};
type QueryParams = {};

/**
 * [get] `/docs`.
 *
 * returns all docs from (in-memory) cache.
 */
export default (async function docs(_, res) {
  try {
    const docs = [...cache.entries()].map(([slug, { meta }]) => ({
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
