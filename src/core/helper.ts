export const deepCopy = <T>(
  obj: T,
  hash: WeakMap<any, any> = new WeakMap(),
): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const result = Array.isArray(obj) ? ([] as T) : ({} as T);
  hash.set(obj, result);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepCopy(obj[key], hash);
    }
  }

  return result;
};
