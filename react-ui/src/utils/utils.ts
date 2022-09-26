export const valueOrDefault: valueOrDefaultType = (d, a) => (a ? a : d);

/** Mutate Lists **/
export const insertItemIntoArray: insertOrUpdateItemType = (i, a, v) => [
  ...a.slice(0, i),
  v,
  ...a.slice(i),
];
export const updateItemInArray: insertOrUpdateItemType = (i, a, v) => [
  ...a.slice(0, i),
  v,
  ...a.slice(i + 1),
];
export const removeItemFromArray: removeItemFromArrayType = (i, arr) => [
  ...arr.slice(0, i),
  ...arr.slice(i + 1),
];

type valueOrDefaultType = (defaultValue: any, value: any) => any;
type insertOrUpdateItemType = (
  index: number,
  array: Array<any>,
  value: any
) => Array<any>;
type removeItemFromArrayType = (index: number, array: Array<any>) => Array<any>;
