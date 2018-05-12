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
    if(map[[x, y]] === "F") {
      map[[x, y]] = ".";
      direction = [-direction[0], -direction[1]];
    } else if(map[[x, y]] === "#") {
      map[[x, y]] = "F";
      direction = [direction[1], -direction[0]];
    } else if(map[[x, y]] === "W") {
      map[[x, y]] = "#";
      infectionCount++;
    } else {
      map[[x, y]] = "W";
      direction = [-direction[1], direction[0]];
    }

    [x, y] = vecSum([x, y], direction)
  }

  return infectionCount;
};

expect(solve("input_test.dat", 100)).to.equal(26);
expect(solve("input_test.dat", 10000000)).to.equal(2511944);

console.log(solve("input.dat", 10000000));
