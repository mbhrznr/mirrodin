import type { RequestHandler } from "express";
import type { NotificationEvent } from "minio";

import minio, { BUCKET_DOCS, getObject } from "~/lib/minio/minio";
import redis, { deleteDocument, setDocument } from "~/lib/redis/redis";
import slugify from "~/utils/slugify";

type Params = {};
type ResponseBody = { ok: boolean };
type RequestBody = { EventName: NotificationEvent; Key: string; Records: {} };

/**
 * [post] `/webhooks/docs`.
 *
 * updates the doc in redis whenever a doc is created, updated or deleted in minio.
 */
export default (async function docs(req, res) {
  const { EventName, Key } = req.body;
  const key = Key.replace(`${BUCKET_DOCS}/`, "");
  const slug = slugify(key);

  switch (EventName) {
    case "s3:ObjectCreated:Put":
      const object = await getObject(minio, BUCKET_DOCS, key);
      await setDocument(redis, slug, object as string);
      break;
    case "s3:ObjectRemoved:Delete":
      await deleteDocument(redis, slug);
      break;
  }

  return res.json({ ok: true });
} satisfies RequestHandler<Params, ResponseBody, RequestBody>);
