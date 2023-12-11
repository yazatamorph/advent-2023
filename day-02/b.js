const { readFileSync } = require("fs");

/**
 * @param {string} path
 * @return {number}
 */
const minCubesPowerSum = (path) => {
  const raw = readFileSync(path).toString("utf8").trim().split(/\n/g);

  const regex = new RegExp("(\\d+) (red|green|blue)");

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

  // list powers of min num of each cube for each game
  let total = 0;
  games.forEach((game) => {
    // keeps track of minimum for each color across handfuls in a game
    // init at 1 because multiplying by 1 == original value
    const minPerColor = {
      red: 1,
      green: 1,
      blue: 1,
    };
    // for each handful
    // loop over each string in handful
    // find whether count of color in handful is greater than in minPerColor
    // if count is greater than running total for that color
    // assign count to minPerColor[color]
    for (let h in game) {
      const handful = game[h];

      handful.forEach((s) => {
        const [_, countS, color] = s.match(regex);
        const count = Number(countS); // convert string to number or comparisons get WoNkY

        if (count > minPerColor[color]) minPerColor[color] = count;
      });
    }
    const { red, green, blue } = minPerColor;

    total += red * green * blue;
  });

  return total;
};

console.log(minCubesPowerSum("./input.txt"));
// console.log(minCubesPowerSum("./example.txt")); // Output: 2286
