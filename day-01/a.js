const { readFileSync } = require("fs");

/**
 * @param {string} path
 * @return {number}
 */
const calibration = (path) => {
  const coords = readFileSync(path).toString("utf8").split(/\n/g);
  const vals = [];

  for (let i = 0; i < coords.length; i++) {
    const c = coords[i];
    let left = 0;
    let right = c.length - 1;
    const val = {
      left: null,
      right: null,
    };

    while (left <= right) {
      // break if we've found both values
      if (val.left && val.right) break;
      // if pointers are same, we don't have any values,
      // and c[left] is a number, then assign to both and break
      if (left === right && !val.left && !val.right && !isNaN(c[left])) {
        val.left = c[left];
        val.right = c[right];
        break;
      }

      if (!val.left && !isNaN(c[left])) val.left = c[left];
      if (!val.left) left++;

      if (!val.right && !isNaN(c[right])) val.right = c[right];
      if (!val.right) right--;
    }
    vals.push(Number([val.left, val.right].join("")));
  }

  return vals.reduce((acc, curr) => acc + curr, 0);
};

console.log(calibration("./input.txt"));
