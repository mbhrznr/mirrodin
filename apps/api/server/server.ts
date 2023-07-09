import cors from "cors";
import express from "express";
import morgan from "morgan";

import createRouter from "~/router/router";

/**
 * createServer.
 *
 * creates an express server.
 * contains all middlewares and the main router.
 */
export default function createServer() {
  const app = express();
  const router = createRouter();

  app
    .disable("x-powered-by")
    .use(cors())
    .use(express.json())
    .use(morgan("dev"))
    .use("/", router);

  return app;
}
