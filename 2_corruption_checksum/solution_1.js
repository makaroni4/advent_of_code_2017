let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  return input.split("\n").reduce((checksum, row) => {
    row = row.split(/\s+/).map(i => parseInt(i, 10));

    checksum += Math.max(...row) - Math.min(...row);

    return checksum;
  }, 0);
};

expect(solve(`5 1 9 5
7 5 3
2 4 6 8`)).to.equal(18);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
