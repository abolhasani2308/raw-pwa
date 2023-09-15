//@ts-nocheck
/**
 * Compare non-function properties in order to determine equality for `React.memo`
 * @param prevObj first object
 * @param newObj second object
 * @returns a flag that indicates the equality of two objects
 */
export function primitiveShallowCompare(prevObj: any, newObj: any) {
  for (const key in prevObj) {
    if (
      typeof newObj[key] === typeof prevObj[key] &&
      typeof newObj[key] === 'function'
    )
      continue;
    if (newObj[key] !== prevObj[key]) return false;
  }
  return true;
}
