let fs = require('fs'),
    expect = require('chai').expect;

let findDivisibleValue = (array) => {
  array.sort(function(a, b) {
    return a - b;
  }).reverse();

  let index = 0;

  for (num of array) {
    var evenDivider = array.slice(index + 1).find(n => num % n === 0);

    if (evenDivider) {
      return num / evenDivider;
    }

    index += 1;
  }

  throw `Divisible value wasn't found for ${array}`
};

expect(findDivisibleValue([5, 9, 2, 8])).to.equal(4);
expect(findDivisibleValue([9, 4, 7, 3])).to.equal(3);
expect(findDivisibleValue([3, 8, 6, 5])).to.equal(2);
expect(findDivisibleValue([116, 51, 32, 155, 102, 92, 65, 42, 48, 91, 74, 69, 52, 89, 20, 143])).to.equal(2);

let solve = (input) => {
  return input.split("\n").reduce((checksum, row) => {
    row = row.split(/\s+/).map(i => parseInt(i, 10));

    checksum += findDivisibleValue(row);

    return checksum;
  }, 0);
};

expect(solve(`5 9 2 8
9 4 7 3
3 8 6 5`)).to.equal(9);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
