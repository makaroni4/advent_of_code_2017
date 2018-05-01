let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
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

  let seenPrograms = new Set(["0"]),
      zeroGroup = new Set(["0", ...pipes["0"]]);

  let extractPrograms = (programs) => {
    programs.forEach(program => {
      if(!seenPrograms.has(program)) {
        seenPrograms.add(program);

        zeroGroup = new Set([...zeroGroup, ...pipes[program]]);

        extractPrograms(pipes[program]);
      }
    });
  }

  extractPrograms(pipes["0"]);

  return zeroGroup.size;
};

expect(solve(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`)).to.equal(6);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
