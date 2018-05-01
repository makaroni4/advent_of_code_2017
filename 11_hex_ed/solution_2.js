let fs = require('fs'),
    expect = require('chai').expect;

let deleteAt = (array, index) => {
  array.splice(index, 1);

  return array;
}

let findDistance = (steps) => {
  let basis = ["n", "ne", "se", "s", "sw", "nw"],
      mergeCombos = {};

  // steps back
  for(let i = 0; i < basis.length; i++) {
    mergeCombos[[basis[i], basis[(i + 3) % 6]]] = null;
  }

  // round steps
  for(let i = 0; i < basis.length; i++) {
    mergeCombos[ [basis[i], basis[(i + 2) % 6]] ] = basis[(i + 1) % 6];
    mergeCombos[ [basis[(i + 2) % 6], basis[i]] ] = basis[(i + 1) % 6];
  }

  let finalSteps = {};

  for(let i = 0; i < steps.length; i++) {
    let nextStep = steps[i];

    let complementaryStep = Object.keys(finalSteps).filter(k => {
      return finalSteps[k] > 0;
    }).find(x => mergeCombos.hasOwnProperty([x, nextStep]));

    while(complementaryStep && finalSteps[complementaryStep] > 0) {
      finalSteps[complementaryStep]--;

      nextStep = mergeCombos[[complementaryStep, nextStep]];

      complementaryStep = nextStep ? Object.keys(finalSteps).filter(k => {
        return finalSteps[k] > 0;
      }).find(x => mergeCombos.hasOwnProperty([x, nextStep])) : null;
    }

    if(nextStep) {
      if(finalSteps[nextStep]) {
        finalSteps[nextStep]++;
      } else {
        finalSteps[nextStep] = 1;
      }
    }
  }

  return Object.keys(finalSteps).map(k => finalSteps[k]).reduce((x, y) => x + y);
};

let findMaxDistance = (steps) => {
  let maxDistance = 0;

  while(steps.length > maxDistance) {
    let currentDistance = findDistance(steps);

    if(currentDistance > maxDistance) {
      maxDistance = currentDistance;
    }

    steps.pop();
  }

  return maxDistance;
}

expect(findDistance(["n", "n", "n", "n", "s", "s"])).to.equal(2);
expect(findMaxDistance(["n", "n", "n", "n", "s", "s"])).to.equal(4);

let steps = fs.readFileSync("input.dat").toString().trim().split(",");

console.log(findMaxDistance(steps));
