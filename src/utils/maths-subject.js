export const sumObject = (myObject) => {
  let total = 0.0;
  Object.values(myObject).forEach((el) => (total += el));
  return total;
};
