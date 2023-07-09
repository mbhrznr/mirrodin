import type { RequestHandler } from "express";

import cache from "~/lib/cache/cache";
import lowercase from "~/utils/lowercase";

import type { CacheValue } from "~/lib/cache/cache";

type Params = { id: string };
type ResponseBody = CacheValue | { message: string; name: string };
type RequestBody = {};
type QueryParams = {};
type S3Error = Error & { name: "S3Error"; code: keyof typeof errors };

const errors = {
  NoSuchKey: 404,
};

/**
 * [get] `/docs/:id`.
 *
 * returns a doc from (in-memory) cache.
 */
export default (async function docs(req, res) {
  const { id } = req.params;

  try {
    const doc = cache.get(id);

    return res.json(doc);
  } catch (error) {
    return res
      .json({
        message: lowercase((error as Error).message),
        name: lowercase((error as Error).name),
      })
      .status(errors[(error as S3Error)?.code as keyof typeof errors] ?? 500);
  }
} satisfies RequestHandler<Params, ResponseBody, RequestBody, QueryParams>);
