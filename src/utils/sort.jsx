export function Ascending(array, keyname, stateFunc) {
  const arraySort = [...array];
  arraySort.sort((a, b) => {
    const value = valueExtractor(a, keyname.split("."));
    const value1 = valueExtractor(b, keyname.split("."));
    if (value.toLowerCase() < value1.toLowerCase()) return -1;
    if (value.toLowerCase() > value1.toLowerCase()) return 1;
  });

  stateFunc(arraySort);
}
export function Descending(array, keyname, stateFunc) {
  const arraySort = [...array];
  arraySort.sort((a, b) => {
    const value = valueExtractor(a, keyname.split("."));
    const value1 = valueExtractor(b, keyname.split("."));
    if (value.toLowerCase() > value1.toLowerCase()) return -1;
    if (value.toLowerCase() < value1.toLowerCase()) return 1;
  });

  stateFunc(arraySort);
}
export function NumberDescending(array, keyname, stateFunc) {
  const arraySort = [...array];
  arraySort.sort((a, b) => {
    const value = valueExtractor(a, keyname.split("."));
    const value1 = valueExtractor(b, keyname.split("."));
    return value1 - value;
  });

  stateFunc(arraySort);
}
export function NumberAscending(array, keyname, stateFunc) {
  const arraySort = [...array];
  arraySort.sort((a, b) => {
    const value = valueExtractor(a, keyname.split("."));
    const value1 = valueExtractor(b, keyname.split("."));
    return value - value1;
  });

  stateFunc(arraySort);
}
function valueExtractor(obj, keys) {
  const value = keys.reduce((prev, curr) => prev[curr], obj);
  return value;
}
