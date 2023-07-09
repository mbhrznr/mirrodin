import { DefaultBodyType, PathParams, rest } from "msw";

import { SearchResult, SearchError } from "../types/types";

export const handlers = [
  rest.all<DefaultBodyType, PathParams, SearchResult | SearchError>(
    "api/search",
    async (req, res, ctx) => {
      const q = req.url.searchParams.get("q");

      if (req.method !== "GET") {
        return res(ctx.status(405));
      }
      if (!q) {
        return res(ctx.status(200), ctx.json({ docs: [], total: 0 }));
      }
      return res(ctx.status(200), ctx.json({ docs: [], total: 0 }));
    }
  ),
];
