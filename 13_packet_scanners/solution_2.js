let fs = require('fs'),
    expect = require('chai').expect;

let readInput = (input) => {
  return new Map(input.split("\n").map(x => x.split(": ").map(y => parseInt(y))))
}

let calculateSeverity = (input, delay, maxLayer) => {
  let severity = 0;

  for(let i = 0; i <= maxLayer; i++) {
    let layerRange = input.get(i);

    if(typeof(layerRange) === "number") {
      if((delay + i) % (2 * (layerRange - 1)) === 0) {
        severity += 1;
      }
    }
  }

  return severity;
};

let solve = (input, maxLayer) => {
  let delay = 0;

  while(calculateSeverity(input, delay, maxLayer) > 0) {
    delay += 1;
  }

  return delay;
}

expect(calculateSeverity(readInput(`0: 3
1: 2
4: 4
6: 4`), 0, 6)).to.equal(2);

expect(solve(readInput(`0: 3
1: 2
4: 4
6: 4`), 6)).to.equal(10);

let input = readInput(fs.readFileSync("input.dat").toString().trim()),
    maxLayer = Math.max(...input.keys());

console.log(solve(input, maxLayer));
