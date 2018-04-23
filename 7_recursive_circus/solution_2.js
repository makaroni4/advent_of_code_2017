let fs = require("fs"),
    expect = require("chai").expect;

let isBalancedTower = (programs) => {
  return !!programs.reduce((a, b) => {
    return (a === b) ? a : NaN;
  });
}

expect(isBalancedTower([1, 1, 1])).to.equal(true);
expect(isBalancedTower([1, 1, 2])).to.equal(false);
expect(isBalancedTower([NaN, NaN, NaN])).to.equal(false);

let solve = (input) => {
  input = input.split("\n").map(x => x.split(" -> "));

  let programsTowers = {},
      programsWeights = {},
      towerWeights = {},
      queue = [];

  input.forEach((programsRow) => {
    if(programsRow.length === 2) {
      let bottomProgram       = programsRow.shift(),
          programsOnTop       = programsRow.shift().split(", "),
          bottomProgramName   = bottomProgram.match(/\w+/)[0],
          bottomProgramWeight = parseInt(bottomProgram.match(/\d+/)[0]);

      queue.push(bottomProgramName);

      programsTowers[bottomProgramName]  = programsOnTop;
      programsWeights[bottomProgramName] = bottomProgramWeight;
    } else {
      let program = programsRow[0].match(/\w+/)[0],
          weight  = parseInt(programsRow[0].match(/\d+/)[0]);

      programsWeights[program] = weight;
      towerWeights[program] = weight; // top program is a tower with no programs on top
    }
  });

  while(queue.length > 0) {
    let nextProgram = queue.shift(),
        towerPrograms = programsTowers[nextProgram];

    if(towerWeights[nextProgram]) {
      continue;
    }

    if(towerPrograms.every(x => typeof(towerWeights[x]) === "number")) {
      if(isBalancedTower(towerPrograms.map(x => towerWeights[x]))) {
        towerWeights[nextProgram] = programsWeights[nextProgram] + towerPrograms.map(x => towerWeights[x]).reduce((x, y) => x + y);
      } else {
        let towerProgramsWeights = towerPrograms.map(x => programsWeights[x]),
            towerTowersWeights   = towerPrograms.map(x => towerWeights[x]),
            brokenTowerIndex     = towerTowersWeights.findIndex(weight => {
              return towerTowersWeights.filter(w => w === weight).length === 1;
            });

        let properTowerWeight = towerTowersWeights.find(weight => {
          return towerTowersWeights.filter(w => w === weight).length > 1;
        });

        return properTowerWeight + towerProgramsWeights[brokenTowerIndex] - towerTowersWeights[brokenTowerIndex];
      }
    } else {
      queue.push(nextProgram);
    }
  }
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
cntj (57)`)).to.equal(60);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
