const { readFileSync } = require("fs");

/**
 * @param {string} path
 * @return {number}
 */
const calibration = (path) => {
  const stringToMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const keys = Object.keys(stringToMap);
  // left regex with end anchor so the match has to extend to the end,
  // but not necessarily the beginning, of the selection
  const regexLeft = new RegExp(`(${keys.join("|")})$`);
  // right regex with start anchor so the match has to extend to the start,
  // but not necessarily the end, of the selection
  const regexRight = new RegExp(`^(${keys.join("|")})`);

  const coords = readFileSync(path).toString("utf8").split(/\n/g);

  let total = 0;
  for (let i = 0; i < coords.length; i++) {
    // the line to analyze
    const c = coords[i];
    // strings
    let leftS = null;
    let rightS = null;
    // numbers
    let leftN = null;
    let rightN = null;
    // double pointer iterating over string c
    let j = 0;
    while (!leftN || !rightN) {
      if (!leftN) {
        leftS += c[j];
        leftN = (() => {
          if (!isNaN(c[j])) return c[j];
          if (leftS.match(regexLeft))
            return stringToMap[leftS.match(regexLeft)[0]];
          return null;
        })();
      }
      if (!rightN) {
        const posR = c.length - j - 1;
        rightS = c[posR] + rightS;
        rightN = (() => {
          if (!isNaN(c[posR])) return c[posR];
          if (rightS.match(regexRight))
            return stringToMap[rightS.match(regexRight)[0]];
          return null;
        })();
      }
      j++;
    }

    total += Number([leftN, rightN].join(""));
  }

  return total;
};

console.log(calibration("./input.txt"));
