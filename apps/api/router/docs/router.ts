import { Router } from "express";

import doc from "./get.doc";
import docs from "./get.docs";

/**
 * createDocsRouter.
 *
 * creates an express router.
 * contains all docs related routes.
 */
export default function createDocsRouter() {
  const router = Router();

  router.get("/", docs);
  router.get("/:id", doc);

  return router;
}
