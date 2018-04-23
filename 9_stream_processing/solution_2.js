let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let i = 0,
      inGarbage = false;
      garbageCharacters = 0;

  while(i < input.length) {
    let currentSymbol = input[i];

    if(currentSymbol === "!") {
      i += 1;
    } else if(inGarbage) {
      if (currentSymbol === ">") {
        inGarbage = false;
      } else {
        garbageCharacters += 1;
      }
    } else if (currentSymbol === "<") {
      inGarbage = true;
    }

    i += 1;
  }

  return garbageCharacters;
};

expect(solve("{}")).to.equal(0);
expect(solve("{{{}}}")).to.equal(0);
expect(solve("{{},{}}")).to.equal(0);
expect(solve("{{{},{},{{}}}}")).to.equal(0);
expect(solve("{<a>,<a>,<a>,<a>}")).to.equal(4);
expect(solve("{{<ab>},{<ab>},{<ab>},{<ab>}}")).to.equal(8);
expect(solve("{{<!!>},{<!!>},{<!!>},{<!!>}}")).to.equal(0);
expect(solve("{{<a!>},{<a!>},{<a!>},{<ab>}}")).to.equal(17);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
