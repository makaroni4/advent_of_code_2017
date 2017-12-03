let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  if(input === 1) {
    return 0;
  }

  let spiralCircleIndex = 1,
      maxSpiralNumber = 1;

  while(maxSpiralNumber < input) {
    spiralCircleIndex += 1;
    maxSpiralNumber += 8 * (spiralCircleIndex - 1);
  }

  let prevCircleMaxNumber = maxSpiralNumber - 8 * (spiralCircleIndex - 1),
      middleCircleNum = prevCircleMaxNumber + (spiralCircleIndex - 1),
      sideSize = 2 * (spiralCircleIndex - 1);

  while(input > prevCircleMaxNumber + sideSize) {
    prevCircleMaxNumber += sideSize;
    middleCircleNum += sideSize
  }

  let verticalSteps = spiralCircleIndex - 1,
      horizontalSteps = Math.abs(input - middleCircleNum);

  return verticalSteps + horizontalSteps;
};

expect(solve(1)).to.equal(0);
expect(solve(10)).to.equal(3);
expect(solve(11)).to.equal(2);
expect(solve(12)).to.equal(3);
expect(solve(13)).to.equal(4);
expect(solve(14)).to.equal(3);
expect(solve(15)).to.equal(2);
expect(solve(16)).to.equal(3);
expect(solve(17)).to.equal(4);
expect(solve(18)).to.equal(3);
expect(solve(19)).to.equal(2);
expect(solve(20)).to.equal(3);
expect(solve(21)).to.equal(4);
expect(solve(22)).to.equal(3);
expect(solve(23)).to.equal(2);
expect(solve(24)).to.equal(3);
expect(solve(25)).to.equal(4);
expect(solve(26)).to.equal(5);
expect(solve(27)).to.equal(4);
expect(solve(48)).to.equal(5);
expect(solve(1024)).to.equal(31);

console.log(solve(368078));
