let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let index = 0,
      inputLength = input.length,
      nextDigitDistance = inputLength / 2,
      sum = 0;

  for (const ch of input) {
    let nextDigit = input[(index + nextDigitDistance) % inputLength];

    if (ch === nextDigit) {
      sum += parseInt(ch, 10);
    }

    index += 1;
  }

  return sum;
};

expect(solve("1212")).to.equal(6);
expect(solve("1221")).to.equal(0);
expect(solve("123425")).to.equal(4);
expect(solve("123123")).to.equal(12);
expect(solve("12131415")).to.equal(4);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
