import type { SchemaFieldTypes } from "redis";

type TransformOutput = {
  TAG: string[];
  TEXT: string;
};

/**
 * transform.
 *
 * transforms values in redisearch compatible types.
 */
export default function transform<T, O extends keyof TransformOutput>(
  values: T,
  type: SchemaFieldTypes
) {
  switch (type) {
    case "TAG":
      return (Array.isArray(values)
        ? values
        : [values]) as unknown as TransformOutput[O];
    case "TEXT":
    default: {
      return (Array.isArray(values)
        ? values.join(" ")
        : values) as unknown as TransformOutput[O];
    }
  }
}
