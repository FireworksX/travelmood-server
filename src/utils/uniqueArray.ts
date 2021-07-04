export function uniqueArray<T = any>(...arrays: T[][]): T[] {
  const flatList = arrays.flat();
  const resList = [];

  flatList.forEach(val => {
    if (!resList.includes(val)) {
      resList.push(val);
    }
  });
  return resList;
}
