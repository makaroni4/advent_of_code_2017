let expect = require('chai').expect;

let calculateCoordinates = (input) => {
  if(input === 1) {
    return [0, 0];
  }

  let spiralCircleIndex = 1,
      maxSpiralNumber = 1;

  while(maxSpiralNumber < input) {
    spiralCircleIndex += 1;
    maxSpiralNumber += 8 * (spiralCircleIndex - 1);
  }

  let prevCircleMaxNumber = maxSpiralNumber - 8 * (spiralCircleIndex - 1),
      maxSpiralNumberCell = [1, -1].map(x => x * (spiralCircleIndex - 1));

  let spiralVecs = [[0, 1], [-1, 0], [0, -1], [1, 0]], // up, left, down, right
      sideCells = 2 * (spiralCircleIndex - 1);

  let currentNumber = prevCircleMaxNumber,
      currentCell = maxSpiralNumberCell,
      numberOfSides = 4;

  if(currentNumber === input) {
    return currentCell;
  }

  for(let s = 0; s < numberOfSides; s += 1) {
    let currentDirection = spiralVecs[s];

    for(let i = 0; i < sideCells; i += 1) {
      currentNumber += 1;
      currentCell = currentCell.map((num, idx) => {
        return num + currentDirection[idx];
      });

      if(currentNumber === input) {
        return currentCell;
      }
    }
  }

  throw new Error("Coordinates were not found, there is a bug.");
};

expect(calculateCoordinates(1)).to.eql([0, 0]);
expect(calculateCoordinates(2)).to.eql([1, 0]);
expect(calculateCoordinates(3)).to.eql([1, 1]);
expect(calculateCoordinates(4)).to.eql([0, 1]);
expect(calculateCoordinates(5)).to.eql([-1, 1]);
expect(calculateCoordinates(6)).to.eql([-1, 0]);
expect(calculateCoordinates(7)).to.eql([-1, -1]);
expect(calculateCoordinates(8)).to.eql([0, -1]);
expect(calculateCoordinates(9)).to.eql([1, -1]);
expect(calculateCoordinates(10)).to.eql([2, -1]);
expect(calculateCoordinates(13)).to.eql([2, 2]);
expect(calculateCoordinates(17)).to.eql([-2, 2]);
expect(calculateCoordinates(21)).to.eql([-2, -2]);
expect(calculateCoordinates(25)).to.eql([2, -2]);

let neighbordsSum = (cell, grid) => {
  let x = cell[0],
      y = cell[1],
      neighbordsCoordinates = [
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x - 1, y + 1],
        [x - 1, y],
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1]
      ];

  return neighbordsCoordinates.reduce((checksum, cell) => {
    if (grid[cell]) {
      checksum += grid[cell];
    }

    return checksum;
  }, 0);
}

let solve = (input) => {
  let grid = {},
      index = 2,
      nextCellValue = 1;

  grid[[0, 0]] = 1;

  while (true) {
    let nextCell = calculateCoordinates(index),
        nextCellValue = neighbordsSum(nextCell, grid);

    grid[nextCell] = nextCellValue;

    if(nextCellValue > input) {
      return nextCellValue;
    }

    index += 1;
  }
};

expect(solve(58)).to.equal(59);
expect(solve(750)).to.equal(806);

console.log(solve(368078));
