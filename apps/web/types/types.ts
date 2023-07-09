export type AST = {
  children?: AST[];
  properties?: Record<string, unknown>;
  tagName?: string;
  type: string;
  value?: string;
};

export type SearchResult = {
  docs: {
    meta: {
      description?: string;
      tags?: string[];
    };
    slug: string;
  }[];
  total: number;
};

export type SearchError = {
  message: string;
  name: string;
};
