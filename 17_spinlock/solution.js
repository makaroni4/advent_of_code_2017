let fs = require('fs'),
    expect = require('chai').expect;

let solve = (stepsPerInsert, totalSteps) => {
  let state = [0],
      currentPosition = 0;

  for(let i = 0; i < totalSteps; i++) {
    let relativeSteps = stepsPerInsert % state.length;

    currentPosition = (currentPosition + relativeSteps) < state.length ?
      currentPosition + relativeSteps :
      relativeSteps - (state.length - currentPosition);

    state.splice(currentPosition + 1, 0, i + 1);

    currentPosition += 1;
  }

  return state[currentPosition + 1];
};

expect(solve(3, 3)).to.eql(1);

console.log(solve(344, 2017));
