let fs = require('fs'),
    expect = require('chai').expect;

let readDiagram = (fileName) => {
  let diagram = fs.readFileSync(fileName).toString().split("\n").filter(l => l.length > 0);

  return diagram;
}

let vecSum = (vec1, vec2) => {
  return vec1.map(function(value1, i) {
    return value1 + vec2[i];
  })
}

expect(vecSum([1, 2], [3, 4])).to.eql([4, 6]);

let isValidIndex = (diagram, x, y) => {
  const diagramMaxX = diagram[0].length;
  const diagramMaxY = diagram.length;

  return y > -1 && y < diagramMaxY && x > -1 && x < diagramMaxX;
}

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

let nextDirection = (diagram, x, y, currentDirection) => {
  return DIRECTIONS.findIndex((d, di) => {
    if(currentDirection < 2 && di < 2) {
      return;
    }

    if(currentDirection > 1 && di > 2) {
      return;
    }

    let [i, j] = vecSum([x, y], d);

    if(currentDirection < 2) {
      return isValidIndex(diagram, i, j) && (diagram[j][i] === "-" || diagram[j][i].match(/[A-Z]/));
    } else {
      return isValidIndex(diagram, i, j) && (diagram[j][i] === "|" || diagram[j][i].match(/[A-Z]/));
    }
  });
}

let solve = (diagram) => {
  let x = diagram[0].indexOf("|");
  let y = 0;
  let direction = 0;
  let pathLetters = [];
  let totalSteps = 0;

  while(isValidIndex(diagram, x, y) && direction > -1) {
    while(diagram[y][x] !== "+") {
      if(diagram[y][x] === " ") {
        return {
          pathLetters: pathLetters.join(""),
          totalSteps: totalSteps
        };
      }

      if(diagram[y][x].match(/[A-Z]/)) {
        pathLetters.push(diagram[y][x]);
      }

      [x, y] = vecSum([x, y], DIRECTIONS[direction]);

      totalSteps++;
    }

    direction = nextDirection(diagram, x, y, direction);

    [x, y] = vecSum([x, y], DIRECTIONS[direction]);
    totalSteps++;
  }

  return {
    pathLetters: pathLetters.join(""),
    totalSteps: totalSteps
  };
};

let testDiagram = readDiagram("input_test.dat");

expect(solve(testDiagram).pathLetters).to.equal("ABCDEF");

let diagram = readDiagram("input.dat");

console.log(solve(diagram).pathLetters);
console.log(solve(diagram).totalSteps);
