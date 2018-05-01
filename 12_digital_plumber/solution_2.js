let fs = require('fs'),
    expect = require('chai').expect;

let readInput = (input) => {
  input = input.split("\n").map(x => x.split(" <-> "));

  let pipes = {};

  input.forEach((el) => {
    let pipeStart = el[0];
    let pipeEnds = el[1].split(", ");

    if(!pipes[pipeStart]) {
      pipes[pipeStart] = new Set();
    }

    pipeEnds.forEach(pipeEnd => {
      if(!pipes[pipeEnd]) {
        pipes[pipeEnd] = new Set();
      }

      pipes[pipeStart].add(pipeEnd);
      pipes[pipeEnd].add(pipeStart);
    });
  });

  return pipes;
}

let findGroup = (pipes, targetProgram) => {
  let seenPrograms = new Set([targetProgram]),
      zeroGroup = new Set([targetProgram, ...pipes[targetProgram]]);

  let extractPrograms = (programs) => {
    programs.forEach(program => {
      if(!seenPrograms.has(program)) {
        seenPrograms.add(program);

        zeroGroup = new Set([...zeroGroup, ...pipes[program]]);

        extractPrograms(pipes[program]);
      }
    });
  }

  extractPrograms(pipes[targetProgram]);

  return zeroGroup;
};

let solve = (input) => {
  let pipes = readInput(input),
      programs = Object.keys(pipes),
      programsInGroups = new Set(),
      totalGroups = 0;

  programs.forEach(program => {
    if(!programsInGroups.has(program)) {
      totalGroups++;

      let group = findGroup(pipes, program);
      programsInGroups = new Set([...programsInGroups, ...group]);
    }
  });

  return totalGroups;
}

expect(solve(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`)).to.equal(2);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
