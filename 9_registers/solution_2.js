let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  // solution
};

expect(solve("")).to.equal();

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
