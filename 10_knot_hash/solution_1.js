let fs = require('fs'),
    expect = require('chai').expect;

let solve = (listSize, input) => {
  let currentPosition = 0,
      skipSize = 0,
      lengths = input;

  let list = [];

  for(let i = 0; i < listSize; i++) {
    list.push(i);
  }

  while(input.length > 0) {
    let currentSublistLength = input.shift(),
        doubleList = list.concat(list),
        shiftedList = doubleList.slice(currentPosition, currentPosition + listSize),
        reversedSublist = shiftedList.slice(0, currentSublistLength).reverse();

    list.splice(currentPosition, currentSublistLength, ...reversedSublist.splice(0, list.length - currentPosition));
    list.splice(0, reversedSublist.length, ...reversedSublist);

    currentPosition = (currentPosition + currentSublistLength + skipSize) % listSize;

    skipSize++;
  }

  return list[0] * list[1];
};

expect(solve(5, [3, 4, 1, 5])).to.equal(12);
expect(solve(7, [4, 6, 1])).to.equal(30);

let input = fs.readFileSync("input.dat").toString().trim().split(",").map(x => parseInt(x));

console.log(solve(256, input));
