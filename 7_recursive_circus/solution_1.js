let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  input = input.split("\n").map(x => x.split(" -> "));

  let programsLinks = {};

  input.forEach((programsRow) => {
    if(programsRow.length === 2) {
      let bottomProgram = programsRow.shift(),
          programsOnTop = programsRow.shift().split(", ");

      bottomProgram = bottomProgram.match(/\w+/)[0];

      programsOnTop.forEach((x) => {
        programsLinks[x] = bottomProgram;
      });
    }
  });

  let [_, bottomProgram] = Object.entries(programsLinks).find((entry) => {
    const [topProgram, bottomProgram] = entry;

    return !programsLinks[bottomProgram];
  });

  return bottomProgram;
};

expect(solve(`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`)).to.equal("tknk");

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
