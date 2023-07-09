/**
 * group.
 *
 * groups array of objects to single object.
 */
export default function group(array: Record<string, unknown>[]) {
  const object = array.reduce((object, entry) => {
    for (const [key, value] of Object.entries(entry)) {
      if (!object[key]) {
        object[key] = [];
      }
      // @ts-ignore
      object[key].push(value);
    }

    return object;
  }, {} as Record<string, unknown[]>);

  return object as Record<string, unknown[]>;
}
