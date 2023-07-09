import Minio from "minio";
import type { BucketItem } from "minio";

export const BUCKET_ASSETS = "assets";
export const BUCKET_DOCS = "docs";

/**
 * getBucketItems.
 *
 * returns a list of items in a bucket.
 * only accepts the known buckets as names.
 */
export async function getBucketItems(
  minio: Awaited<ReturnType<typeof createMinio>>,
  bucket: typeof BUCKET_ASSETS | typeof BUCKET_DOCS
) {
  const items: BucketItem[] = await new Promise((resolve, reject) => {
    const items: BucketItem[] = [];
    const stream = minio.extensions.listObjectsV2WithMetadata(bucket);

    stream.on("data", (object) => items.push(object));
    stream.on("error", reject);
    stream.on("end", () => resolve(items));
  });

  return items;
}

/**
 * getObject.
 *
 * returns the object as a string.
 * only accepts the known buckets as names.
 */
export async function getObject(
  minio: Awaited<ReturnType<typeof createMinio>>,
  bucket: typeof BUCKET_ASSETS | typeof BUCKET_DOCS,
  name: string
) {
  const object: string | Error = await new Promise((resolve, reject) => {
    const chunks: string[] = [];
    minio.getObject(bucket, name, (error, stream) => {
      if (error) {
        return reject(error);
      }

      stream.on("data", (chunk: string) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(chunks.join("")));
    });
  });

  return object;
}

/**
 * createMinio.
 *
 * creates a minio client.
 * creates the known buckets if they don't exist.
 */
async function createMinio() {
  const client = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "jeLWORpICneELiZUBs49",
    secretKey: "UOPOGzBqqJ76lA1JAmu5kRkH51OWtnCLgENnL71T",
  });

  for await (const bucket of [BUCKET_ASSETS, BUCKET_DOCS]) {
    if (!(await client.bucketExists(bucket))) {
      await client.makeBucket(bucket);
    }
  }

  return client;
}

const minio = await createMinio();

export default minio;
