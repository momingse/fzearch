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

export const flattenInLevel = (obj: any): string[][] => {
  let level = -1;
  const queue = [obj];
  const result: string[][] = [];
  while (queue.length) {
    const tempQueue = [];
    for (const item of queue) {
      if (typeof item === "string") {
        result[level] = result[level] || [];
        result[level].push(item);
      } else if (Object.prototype.toString.call(item) === "[object Object]") {
        for (const key in item) {
          tempQueue.push(item[key]);
        }
      }
    }
    queue.length = 0;
    queue.push(...tempQueue);
    level++;
  }

  return result;
};

export const mergeFlattenArray = (arr1: string[][], arr2: string[][]): string[][] => {
  const result: string[][] = [];
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    result[i] = (arr1[i] || []).concat(arr2[i] || []);
  }
  return result;
}

export const getValueByKey = (obj: any, key: string[]): any => {
  let result = obj;
  for (const k of key) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return null;
    }
  }
  return result;
};
