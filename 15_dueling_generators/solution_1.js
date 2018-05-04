let fs = require("fs"),
  expect = require("chai").expect;

class Generator {
  constructor(factor, startingValue) {
    const LOWEST_16_BITS = 65535;

    let prevValue = startingValue;

    this.nextValue = () => {
      let value = (factor * prevValue) % 2147483647;

      prevValue = value;

      return value & LOWEST_16_BITS;
    };
  }
}

(() => {
  let generatorA = new Generator(16807, 65);
  expect(generatorA.nextValue().toString(2)).to.equal("1010101101100111");
  expect(generatorA.nextValue().toString(2)).to.equal("1111011100111001");
  expect(generatorA.nextValue().toString(2)).to.equal("1110001101001010");
  expect(generatorA.nextValue().toString(2)).to.equal("1011011000111");
  expect(generatorA.nextValue().toString(2)).to.equal("1001100000100100");

  let generatorB = new Generator(48271, 8921);
  expect(generatorB.nextValue().toString(2)).to.equal("1101001100110111");
  expect(generatorB.nextValue().toString(2)).to.equal("1000010110001000");
  expect(generatorB.nextValue().toString(2)).to.equal("1110001101001010");
  expect(generatorB.nextValue().toString(2)).to.equal("1100110000000111");
  expect(generatorB.nextValue().toString(2)).to.equal("10100000000100");
})();

let solve = (startValueA, startValueB, totalPairs) => {
  let generatorA = new Generator(16807, startValueA);
  let generatorB = new Generator(48271, startValueB);
  let matchCount = 0;

  for (let i = totalPairs; i--;) {
    if(generatorA.nextValue() === generatorB.nextValue()) {
      matchCount += 1;
    }
  }

  return matchCount;
};

expect(solve(65, 8921, 5)).to.equal(1);
expect(solve(65, 8921, 40000000)).to.equal(588);

console.log(solve(591, 393, 40000000));
