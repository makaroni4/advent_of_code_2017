let fs = require('fs'),
    expect = require('chai').expect;

let readMap = (fileName) => {
  let map = fs.readFileSync(fileName).toString().trim().split("\n").map(r => r.split(""));
  let mapWidth = map.length;
  let mapObject = {};
  let centerDistance = (mapWidth - 1) / 2;

  map.forEach((row, i) => {
    row.forEach((node, j) => {
      mapObject[[j - centerDistance, centerDistance - i]] = node;
    })
  });

  return [mapObject, centerDistance];
}

let vecSum = (vec1, vec2) => {
  return vec1.map(function(value1, i) {
    return value1 + vec2[i];
  })
}

expect(vecSum([1, 2], [3, 4])).to.eql([4, 6]);

let solve = (mapFileName, steps) => {
  let [map, centerDistance] = readMap(mapFileName);
  let x = 0;
  let y = 0;
  let direction = [0, 1];
  let infectionCount = 0;

  for(let i = 0; i < steps; i++) {
    if(map[[x, y]] === "#") {
      direction = [direction[1], -direction[0]];
      map[[x, y]] = ".";
    } else {
      direction = [-direction[1], direction[0]];
      map[[x, y]] = "#";
      infectionCount++;
    }

    [x, y] = vecSum([x, y], direction)
  }

  return infectionCount;
};

expect(solve("input_test.dat", 7)).to.equal(5);
expect(solve("input_test.dat", 70)).to.equal(41);
expect(solve("input_test.dat", 10000)).to.equal(5587);

console.log(solve("input.dat", 10000));
