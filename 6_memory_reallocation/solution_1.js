let fs = require('fs'),
    expect = require('chai').expect;

let distr = (input) => {
  let maxValue = Math.max(...input),
      maxIndex = input.indexOf(maxValue),
      memorySize = input.length;

  input[maxIndex] = 0;

  for(let i = maxIndex + 1; i < memorySize && maxValue > 0; i++) {
    input[i] += 1;
    maxValue -= 1;
  }

  for(let i = 0; maxValue > 0; i++) {
    i = i % memorySize;

    input[i] += 1;
    maxValue -= 1;
  }

  return input;
};

expect(distr([0, 2, 7, 0])).to.deep.equal([2, 4, 1, 2]);
expect(distr([3, 1, 2, 3])).to.deep.equal([0, 2, 3, 4]);

let solve = (input) => {
  let originalInput = input.slice(0),
      count = 1,
      states = {};

  input = distr(input);

  states[originalInput] = 0;

  while(!states[input]) {
    states[input] = count;
    input = distr(input);
    count += 1;
  }

  return count;
};

expect(solve([0, 2, 7, 0])).to.equal(5);

let input = fs.readFileSync("input.dat").toString().trim().split(/\s+/).map(x => parseInt(x, 10));

console.log(solve(input));
