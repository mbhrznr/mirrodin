import { Router } from "express";

import health from "./get.health";
import search from "./get.search";
import createDocsRouter from "./docs/router";
import createWebhooksRouter from "./webhooks/router";

/**
 * createRouter.
 *
 * creates an express router.
 * contains all routes and their respective routers.
 */
export default function createRouter() {
  const router = Router();

  router.get("/health", health);
  router.get("/search", search);
  router.use("/docs", createDocsRouter());
  router.use("/webhooks", createWebhooksRouter());

  return router;
}
