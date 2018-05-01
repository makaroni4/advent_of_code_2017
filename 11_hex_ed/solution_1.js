let fs = require('fs'),
    expect = require('chai').expect;

let deleteAt = (array, index) => {
  return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

let solve = (input) => {
  input = input.split(",");

  let basis = ["n", "ne", "se", "s", "sw", "nw"];

  let mergeCombos = {};

  // steps back
  for(let i = 0; i < basis.length; i++) {
    mergeCombos[[basis[i], basis[(i + 3) % 6]]] = [];
  }

  // round steps
  for(let i = 0; i < basis.length; i++) {
    mergeCombos[ [basis[i], basis[(i + 2) % 6]] ] = [ basis[(i + 1) % 6] ];
    mergeCombos[ [basis[(i + 2) % 6], basis[i]] ] = [ basis[(i + 1) % 6] ];
  }

  let finalSteps = [];

  while(input.length > 0) {
    let nextStep = input.shift();

    let complementaryStepIndex = finalSteps.findIndex(x => mergeCombos.hasOwnProperty([x, nextStep]));

    while(complementaryStepIndex > -1) {
      let complementaryStep = finalSteps[complementaryStepIndex];

      finalSteps = deleteAt(finalSteps, complementaryStepIndex);

      nextStep = mergeCombos[[complementaryStep, nextStep]];

      complementaryStepIndex = finalSteps.findIndex(x => mergeCombos.hasOwnProperty([x, nextStep]));
    }

    finalSteps = finalSteps.concat(nextStep);
  }

  return finalSteps.length;
};

expect(solve("ne,ne,ne")).to.equal(3);
expect(solve("ne,ne,sw,sw")).to.equal(0);
expect(solve("ne,ne,s,s")).to.equal(2);
expect(solve("se,sw,se,sw,sw")).to.equal(3);
expect(solve("sw,n,ne,s")).to.equal(0);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
