let fs = require('fs'),
    expect = require('chai').expect;

let readRules = (fileName) => {
  let rawRules = fs.readFileSync(fileName).toString().trim().split("\n");
  let initialState = rawRules[0].match(/Begin\sin\sstate\s([A-Z])/)[1];
  let stepsCount = parseInt(rawRules[1].match(/Perform\sa\sdiagnostic\schecksum\safter\s(\d+)\ssteps/)[1], 10);

  let i = 3;
  let stateLength = 9;
  let states = {};

  let extractValueRules = (rules) => {
    let nextMove = {
      right: 1,
      left: -1
    }[rules[1].match(/-\sMove\sone\sslot\sto\sthe\s(right|left)./)[1]];

    return {
      writeValue: parseInt(rules[0].match(/-\sWrite\sthe\svalue\s([01])/)[1], 10),
      nextMove: nextMove,
      nextState: rules[2].match(/-\sContinue\swith\sstate\s([A-Z])./)[1]
    };
  };

  while(i < rawRules.length) {
    let stateRules = rawRules.slice(i, i + stateLength);

    let state = stateRules[0].match(/In\sstate\s([A-Z]):/)[1];
    states[state] = {};
    states[state][0] = extractValueRules(stateRules.slice(2, 5));
    states[state][1] = extractValueRules(stateRules.slice(6, 9));

    i += stateLength + 1;
  }

  return [initialState, stepsCount, states];
}

let solve = (inputFileName) => {
  const [initialState, stepsCount, states] = readRules(inputFileName);

  let tape = {};
  let state = initialState;
  let cursor = 0;

  for(let i = stepsCount; i--;) {
    let currentValue = tape[cursor] || 0;
    let rules = states[state][currentValue];
    tape[cursor] = rules["writeValue"];
    cursor += rules["nextMove"];
    state = rules["nextState"];
  }

  let checkSum = 0;
  Object.keys(tape).forEach(key => {
    if(tape.hasOwnProperty(key)) {
      checkSum += tape[key];
    }
  });

  return checkSum;
};

(() => {
  expect(solve("test_input.dat")).to.equal(3);
})();

(() => {
  console.log(solve("input.dat"));
})();
