let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let currentIndex = 0,
      currentIteration = 0;

  while(currentIndex <= input.length) {
    let prevIndex = currentIndex;

    if(input[currentIndex] !== 0) {
      currentIndex += input[currentIndex];
    }

    if(input[prevIndex] > 2) {
      input[prevIndex] -= 1;
    } else {
      input[prevIndex] += 1;
    }

    currentIteration += 1;
  }

  return currentIteration - 1;
};

expect(solve([0, 3, 0, 1, -3])).to.equal(10);

let input = fs.readFileSync("input.dat").toString().trim().split("\n").map(x => parseInt(x, 10));

console.log(solve(input));
