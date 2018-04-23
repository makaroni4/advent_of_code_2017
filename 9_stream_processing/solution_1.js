let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let i = 0,
      groupDepth = 0,
      inGarbage = false;
      stack = [],
      score = 0;

  while(i < input.length) {
    let currentSymbol = input[i];

    if(!inGarbage && currentSymbol === "{") {
      stack.push(currentSymbol);
      groupDepth += 1;
    } else if (!inGarbage && currentSymbol === "}") {
      if(stack.pop()) {
        score += groupDepth;
        groupDepth -= 1;
      }
    } else if (!inGarbage && currentSymbol === "<") {
      inGarbage = true;
    } else if (inGarbage && currentSymbol === ">") {
      inGarbage = false;
    } else if (currentSymbol === "!") {
      i += 1;
    }

    i += 1;
  }

  return score;
};

expect(solve("{}")).to.equal(1);
expect(solve("{{{}}}")).to.equal(6);
expect(solve("{{},{}}")).to.equal(5);
expect(solve("{{{},{},{{}}}}")).to.equal(16);
expect(solve("{<a>,<a>,<a>,<a>}")).to.equal(1);
expect(solve("{{<ab>},{<ab>},{<ab>},{<ab>}}")).to.equal(9);
expect(solve("{{<!!>},{<!!>},{<!!>},{<!!>}}")).to.equal(9);
expect(solve("{{<a!>},{<a!>},{<a!>},{<ab>}}")).to.equal(3);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
