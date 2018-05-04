let fs = require("fs"),
  expect = require("chai").expect;

class Generator {
  constructor(factor, startingValue, multiplier) {
    const LOWEST_16_BITS = 65535;

    let value = startingValue;

    this.nextValue = () => {
      value = (factor * value) % 2147483647;

      while(value % multiplier !== 0) {
        value = (factor * value) % 2147483647;
      }

      return value & LOWEST_16_BITS;
    };
  }
}

(() => {
  let generatorA = new Generator(16807, 65, 4);
  expect(generatorA.nextValue().toString(2)).to.equal("1001100000100100");

  let generatorB = new Generator(48271, 8921, 8);
  expect(generatorB.nextValue().toString(2)).to.equal("1000010110001000");
})();

let solve = (startValueA, startValueB, totalPairs, multiplierA, multiplierB) => {
  let generatorA = new Generator(16807, startValueA, multiplierA);
  let generatorB = new Generator(48271, startValueB, multiplierB);
  let matchCount = 0;

  for (let i = totalPairs; i--;) {
    if(generatorA.nextValue() === generatorB.nextValue()) {
      matchCount += 1;
    }
  }

  return matchCount;
};

expect(solve(65, 8921, 1056, 4, 8)).to.equal(1);
expect(solve(65, 8921, 5000000, 4, 8)).to.equal(309);

console.log(solve(591, 393, 5000000, 4, 8));
