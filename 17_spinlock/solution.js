let fs = require('fs'),
    expect = require('chai').expect;

let calculateState = (stepsPerInsert, totalSteps) => {
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

  return [state, currentPosition]
};

let solve1 = (stepsPerInsert, totalSteps) => {
  let [state, currentPosition] = calculateState(stepsPerInsert, totalSteps);

  return state[currentPosition + 1];
}

expect(solve1(3, 3)).to.eql(1);

console.log(solve1(344, 2017));

let solve2 = (stepsPerInsert, totalSteps) => {
  let stateLength = 1;
  let currentPosition = 0;
  let valueAfterZero;

  for(let i = 0; i < totalSteps; i++) {
    let relativeSteps = stepsPerInsert % stateLength;

    currentPosition = (currentPosition + relativeSteps) < stateLength ?
      currentPosition + relativeSteps :
      relativeSteps - (stateLength - currentPosition);

    currentPosition += 1;

    if(currentPosition === 1) {
      valueAfterZero = i + 1;
    }

    stateLength += 1;
  }

  return valueAfterZero;
};

console.log(solve2(344, 50000000));
