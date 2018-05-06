let fs = require('fs'),
    expect = require('chai').expect;

let readRules = (fileName) => {
  let rules = fs.readFileSync(fileName).toString().trim().split("\n")
    .map(row => row.split(" => ").map(rule => rule.split("/").map(r => r.split(""))));

  return rules;
}

const dupArray = (array) => (
  JSON.parse(JSON.stringify(array))
)

// https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab
const diagonalFlip = matrix => {
  let m = dupArray(matrix);

  return m[0].map((column, index) => (
    m.map(row => row[index])
  ))
};

const horizontalFlip = matrix => {
  let m = dupArray(matrix);
  return m.map(row => row.reverse());
}

expect(horizontalFlip([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.eql([[3, 2, 1], [6, 5, 4], [9, 8, 7]]);

const rotate = matrix => (
  diagonalFlip(dupArray(matrix).reverse())
);

expect(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.eql([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);

const verticalFlip = (matrix) => (
  dupArray(matrix).reverse()
)

expect(verticalFlip([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.eql([[7, 8, 9], [4, 5, 6], [1, 2, 3]]);

let squareToKey = square => {
  let m = dupArray(square);

  return m.map(r => r.join("")).join("");
}

expect(squareToKey([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.equal("123456789");

let findRule = (square, rules) => {
  let matchSquare = (square, rule) => {
    let ruleInputSquare = rule[0];

    return square.every((row, i) => {
      return row.join("") === ruleInputSquare[i].join("");
    });
  };

  expect(matchSquare([[1, 2], [3, 4]], [[[1, 2], [3, 4]]])).to.equal(true);
  expect(matchSquare([[1, 2], [3, 4]], [[[1, 2], [3, 5]]])).to.equal(false);

  return rules.findIndex(rule => (
      matchSquare(square, rule) ||
      matchSquare(verticalFlip(square), rule) ||
      matchSquare(horizontalFlip(square), rule) ||
      matchSquare(verticalFlip(rotate(square)), rule) ||
      matchSquare(horizontalFlip(rotate(square)), rule) ||
      matchSquare(rotate(square), rule) ||
      matchSquare(rotate(rotate(square)), rule) ||
      matchSquare(rotate(rotate(rotate(square))), rule)
  ));
}

(() => {
  let rules = readRules("test_rules.dat");
  let square = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"]
  ];

  expect(findRule(square, rules)).to.equal(1);
  expect(findRule(horizontalFlip(square), rules)).to.equal(1);
  expect(findRule(verticalFlip(square), rules)).to.equal(1);
  expect(findRule(rotate(square), rules)).to.equal(1);
})();

let mergeSquareToRow = (row, square) => {
  if(row.length === 0) {
    return square;
  } else {
    return row.map((r, i) => {
      return r.concat(square[i]);
    })
  }
}

expect(mergeSquareToRow([], [[1, 2], [3, 4]])).to.eql([[1, 2], [3, 4]]);
expect(mergeSquareToRow([[1, 2], [3, 4]], [[1, 2], [3, 4]])).to.eql([[1, 2, 1, 2], [3, 4, 3, 4]]);

let printPattern = (pattern) => {
  pattern.forEach(row => (
    console.log(row.join(""))
  ));
}

let solve = (rules, totalIterations) => {
  let pattern = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"]
  ];

  let seenSquares = {};

  let transform = (square, rules) => {
    let squareKey = squareToKey(square);

    if(seenSquares[squareKey]) {
      return seenSquares[squareKey];
    }

    let ruleIndex = findRule(square, rules);
    let rule = rules[ruleIndex];

    seenSquares[squareKey] = rule[1];

    return rule[1];
  }

  let squareWidth = 2;

  for(let i = 0; i < totalIterations; i++) {
    let width = pattern[0].length;
    let squareWidth = width % 2 === 0 ? 2 : 3;
    let squaresNumber = width * width / (squareWidth * squareWidth);
    let newPattern = [];

    for(let j = 0; j < pattern.length; j += squareWidth) {
      let newRow = [];

      for(let i = 0; i < width; i += squareWidth) {
        let square = [];

        for(let k = 0; k < squareWidth; k++) {
          square.push(pattern[j + k].slice(i, i + squareWidth))
        }

        let newSquare = transform(square, rules);
        newRow = mergeSquareToRow(newRow, newSquare);
      }

      newPattern = newPattern.concat(newRow);
    }

    pattern = newSquares;
  }

  return pattern.reduce((a, b) => a.concat(b)).filter(x => x === "#").length;
};

let testRules = readRules("test_rules.dat");

expect(solve(testRules, 2)).to.equal(12);

let rules = readRules("input.dat");

console.log(solve(rules, 5));
console.log(solve(rules, 18));
