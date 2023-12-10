const { readFileSync } = require("fs");

/**
 * @param {string} path
 * @return {any}
 */
const main = (path) => {
  const inputs = readFileSync(path).toString("utf8");
  return inputs;
};

console.log(main("./input.txt"));
