// reverse a string
const reverse = (str) => str.split("").reverse().join("");

// find the average of an array of numbers
const average = (arr) => {
  const total = arr.reduce((acc, cur) => acc + cur, 0);
  return arr.length === 0 ? 0 : total / arr.length;
};

module.exports = {
  reverse,
  average,
};
