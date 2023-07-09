# mirrodin

`mirrodin` is named after the [plane](https://magic.wizards.com/story/mirrodin-plane) in the [magic: the gathering](https://magic.wizards.com/) universe.

it is a `redis` powered search engine for markdown files stored in `minio`.
by using [`redis-stack`](https://hub.docker.com/r/redis/redis-stack), it already comes with the `redisearch` and `redisjson` modules.

## architecture

the project is currently split into two parts:

- `web`: a [`next.js`](https://nextjs.org/) app that serves as the frontend
- `api`: a [`express.js`](https://expressjs.com/) app that serves as the backend

### api

once the `api` server is up, it will start with the creation of the `minio` buckets and the `redis` index, if needed.

it will then start to populate the `redis` index with the markdown files in the respective `minio` bucket.

additionally it will also start to listen for changes in the `minio` bucket via webhooks and update the `redis` index accordingly.

### web

`web` uses `next.js`'s app directory to enable the usage of `react`'s server components.

it fetches the data from the `api` server to render the markdown files in the browser.

## development

`mirrodin` is a work in progress, however, you can still run it locally.

### prerequisites

- [`node.js`](https://nodejs.org/)
- [`docker`](https://www.docker.com/)

### setup

the following steps will guide you through the setup process. this setup only needs to be done once, afterwards you can just start the `api` and `web` server via `npm run dev`.

1. clone the repository
2. install dependencies via `npm install`
   ```bash
   npm install
   ```
3. run `docker-compose up` to start `redis` and `minio`
   ```bash
   docker-compose up -d
   ```
4. once `minio` is up, create your [access keys](http://127.0.0.1:9001/access-keys)
5. add your `access keys` to `apps/api/lib/minio/minio.ts`
   ```typescript
   const client = new Minio.Client({
     endPoint: "localhost",
     port: 9000,
     useSSL: false,
     accessKey: "YOUR_ACCESS_KEY",
     secretKey: "YOUR_SECRET_KEY",
   });
   ```
6. start both `api` and `web` via `npm run dev`
   ```bash
   npm run dev
   ```
7. ensure that the `api` server is up and running by visiting [http://localhost:3001/api/health](http://localhost:3000/api/health)
8. ensure that the `web` server is up and running by visiting [http://localhost:3000](http://localhost:3000)
9. add your [events](http://127.0.0.1:9001/buckets/docs/admin/events) for the webhook. the `api` server will listen for `put` and `delete` events.
10. upload your markdown files to the `docs` bucket in `minio`. the `api` server will automatically index them.
