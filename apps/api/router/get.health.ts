import type { RequestHandler } from "express";

type Params = {};
type ResponseBody = { ok: boolean };

/**
 * [get] `/health`.
 *
 * returns health status w/ `{ ok: true }`.
 */
export default (function health(_, res) {
  return res.set("cache-control", "no-cache").json({ ok: true });
} satisfies RequestHandler<Params, ResponseBody>);
