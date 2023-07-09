import minio, {
  getBucketItems,
  getObject,
  BUCKET_DOCS,
} from "~/lib/minio/minio";
import redis, { setDocument } from "~/lib/redis/redis";
import slugify from "~/utils/slugify";

/**
 * prepareServer.
 *
 * gets all docs from minio.
 * prepares the server by setting all docs in redis.
 * prepares the server by setting all docs in cache.
 */
export default async function prepareServer() {
  const items = await getBucketItems(minio, BUCKET_DOCS);

  for await (const item of items) {
    const slug = slugify(item.name);
    const object = await getObject(minio, BUCKET_DOCS, item.name);

    await setDocument(redis, slug, object as string);
  }
}
