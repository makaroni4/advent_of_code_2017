let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let prevDigit = input.slice(-1),
      sum = 0;

  for (const ch of input) {
    if (ch === prevDigit) {
      sum += parseInt(ch, 10);
    }

    prevDigit = ch;
  }

  return sum;
};

expect(solve("1122")).to.equal(3);
expect(solve("1111")).to.equal(4);
expect(solve("1234")).to.equal(0);
expect(solve("91212129")).to.equal(9);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
