const { readFileSync } = require("fs");

/**
 * @param {string} path
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {any}
 */
const gameIsPossible = (path, red, green, blue) => {
  const raw = readFileSync(path).toString("utf8").trim().split(/\n/g);

  const maxCubes = {
    red,
    green,
    blue,
  };
  const colors = Object.keys(maxCubes);

  const regex = new RegExp(`(\\d+) (${colors.join("|")})`);

  const games = new Map(
    raw.map((line, i) => {
      return [
        i + 1,
        line
          .split(": ")[1]
          .split("; ")
          .map((s) => {
            return s.split(", ");
          }),
      ];
    })
  );

  let total = 0;
  // for each game, check each handful to see if the handful is possible
  games.forEach((handfuls, game) => {
    let allHandsPossible = true;
    // for each handful
    // map over each string in handful
    // find whether count of color in handful exceeds maximum
    //
    for (let h in handfuls) {
      const handful = handfuls[h];

      const tooMany = handful
        .map((s) => {
          const [_, count, color] = s.match(regex);

          return count > maxCubes[color];
        })
        .includes(true);

      if (tooMany) {
        allHandsPossible = false;
        break;
      }
    }

    if (allHandsPossible) total += game;
  });

  return total;
};

console.log(gameIsPossible("./input.txt", 12, 13, 14));
// console.log(gameIsPossible("./example.txt", 12, 13, 14));
