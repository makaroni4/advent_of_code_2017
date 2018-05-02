let fs = require('fs'),
    expect = require('chai').expect;

let readInput = (input) => {
  return new Map(input.split("\n").map(x => x.split(": ").map(y => parseInt(y))))
}

let solve = (input) => {
  let maxLayer = Math.max(...input.keys()),
      severity = 0;

  for(let i = 2; i <= maxLayer; i++) {
    let layerRange = input.get(i);

    if(typeof(layerRange) === "number") {
      if(i % (layerRange - 1) === 0) {
        severity += layerRange * i;
      }
    }
  }

  return severity;
};

expect(solve(readInput(`0: 3
1: 2
4: 4
6: 4`))).to.equal(24);

let input = readInput(fs.readFileSync("input.dat").toString().trim());

console.log(solve(input));
