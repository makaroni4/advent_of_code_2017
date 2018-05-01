let fs = require('fs'),
    expect = require('chai').expect;

let readInput = (input) => {
  let output = [];

  for (let char of input) {
    output.push(char.charCodeAt(0));
  }

  return output.concat([17, 31, 73, 47, 23]);
}

expect(readInput("1,2,3")).to.eql([49, 44, 50, 44, 51, 17, 31, 73, 47, 23]);

let runRound = (list, currentPosition, skipSize, lengths) => {
  for(let i = 0; i < lengths.length; i++) {
    let currentSublistLength = lengths[i],
        doubleList = list.concat(list),
        shiftedList = doubleList.slice(currentPosition, currentPosition + list.length),
        reversedSublist = shiftedList.slice(0, currentSublistLength).reverse();

    list.splice(currentPosition, currentSublistLength, ...reversedSublist.splice(0, list.length - currentPosition));
    list.splice(0, reversedSublist.length, ...reversedSublist);

    currentPosition = (currentPosition + currentSublistLength + skipSize) % list.length;

    skipSize++;
  }

  return [list, currentPosition, skipSize];
};

let listToHash = (list) => {
  return list.map(x => {
    return x.toString(16).padStart(2, "0");
  }).join("");
}

let runManyRounds = (input) => {
  let lengths = readInput(input),
      listSize = 256,
      list = [];

  for(let i = 0; i < listSize; i++) {
    list.push(i);
  }

  let i = 0,
      currentPosition = 0,
      skipSize = 0;

  while(i < 64) {
    [list, currentPosition, skipSize] = runRound(list, currentPosition, skipSize, lengths);

    i++;
  }

  for(let i = 0; i < 16; i++) {
    list.splice(i, 16, list.slice(i, i + 16).reduce((x, y) => x ^ y));
  }

  return listToHash(list);
}

expect(runManyRounds("")).to.equal("a2582a3a0e66e6e86e3812dcb672a272")

let input = fs.readFileSync("input.dat").toString().trim();

console.log(runManyRounds(input));
