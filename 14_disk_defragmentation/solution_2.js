let fs = require('fs'),
    chai = require('chai'),
    expect = chai.expect;

chai.use(require('chai-string'));

let knotHash = (input) => {
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

  return runManyRounds(input);
}

let hashToBits = (hash) => {
  let output = [];

  for (let char of hash) {
    output.push(parseInt(char, 16).toString(2));
  }

  return output.join("").padStart(4, "0");;
}

expect(hashToBits("1")).to.equal("0001");
expect(hashToBits("e")).to.equal("1110");
expect(hashToBits("f")).to.equal("1111");

let inputToRow = (input) => {
  let row = "",
      hash = knotHash(input);

  for (let char of hash) {
    row += hashToBits(char);
  }

  return row;
}

expect(inputToRow("flqrgnkx-0")).to.startWith("11010100");
expect(inputToRow("flqrgnkx-1")).to.startWith("01010101");
expect(inputToRow("flqrgnkx-7")).to.startWith("11010110");

let calculateGrid = (input) => {
  const GRID_SIZE = 128;

  let grid = [];

  for(let i = 0; i < GRID_SIZE; i++) {
    grid.push(inputToRow(input + "-" + i).replace(/1/g, "#").replace(/0/g, ".").split(""));
  }

  return grid;
};

let calculateRegions = (input) => {
  const GRID_SIZE = 128,
        adjacentSquares = [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0]
        ];

  let regionsCount = 0,
      grid = calculateGrid(input);

  let fillAdjacentSquares = (grid, x, y) => {
    if(x < (GRID_SIZE - 1) && grid[y][x + 1] === "#") {
      grid[y][x + 1] = grid[y][x];
      fillAdjacentSquares(grid, x + 1, y);
    }

    if(y < (GRID_SIZE - 1) && grid[y + 1][x] === "#") {
      grid[y + 1][x] = grid[y][x];
      fillAdjacentSquares(grid, x, y + 1);
    }

    if(x > 0 && grid[y][x - 1] === "#") {
      grid[y][x - 1] = grid[y][x];
      fillAdjacentSquares(grid, x - 1, y);
    }

    if(y > 0 && grid[y - 1][x] === "#") {
      grid[y - 1][x] = grid[y][x];
      fillAdjacentSquares(grid, x, y - 1);
    }
  }

  for(let x = 0; x < GRID_SIZE; x++) {
    for(let y = 0; y < GRID_SIZE; y++) {
      if(grid[y][x] === "#") {
        regionsCount++;

        grid[y][x] = regionsCount.toString();

        fillAdjacentSquares(grid, x, y);
      }
    }
  }

  return regionsCount;
}

expect(calculateRegions("flqrgnkx")).to.equal(1242);

console.log(calculateRegions("jxqlasbh"));
