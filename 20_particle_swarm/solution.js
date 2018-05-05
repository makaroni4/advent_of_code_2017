let fs = require('fs'),
    expect = require('chai').expect;

let readInput = (fileName) => {
  let particles = fs.readFileSync(fileName).toString().trim().split("\n").map((r, i) => {
    let properties = r.split(", ");

    return [i].concat(properties.map(p => {
      return p.match(/-?\d+\,-?\d+\,-?\d+/)[0].split(",").map(n => parseInt(n));
    }));
  });

  return particles;
}

let solve = (particles) => {
  let manhattanParam = (particle, paramIndex) => {
    return particle[paramIndex].reduce((x, y) => Math.abs(x) + Math.abs(y));
  }

  particles.sort((a, b) => {
    return manhattanParam(a, 3) - manhattanParam(b, 3);
  })

  return particles[0][0];
};

let testParticles = readInput("input_test.dat")

expect(solve(testParticles)).to.equal(0);

let particles = readInput("input.dat")

console.log(solve(particles));
