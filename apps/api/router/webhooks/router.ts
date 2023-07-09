import { Router } from "express";

import docs from "./post.docs";

/**
 * createWebhooksRouter.
 *
 * creates an express router.
 * contains all webhooks related routes.
 */
export default function createWebhooksRouter() {
  const router = Router();

  router.post("/docs", docs);

  return router;
}
