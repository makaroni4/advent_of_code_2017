let fs = require('fs'),
    expect = require('chai').expect;

let vecSum = (vec1, vec2) => {
  return vec1.map(function(value1, i) {
    return value1 + vec2[i];
  })
}

expect(vecSum([1, 2], [3, 4])).to.eql([4, 6]);

class Particle {
  constructor(position, velocity, acceleration) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  move() {
    this.velocity = vecSum(this.velocity, this.acceleration);
    this.position = vecSum(this.position, this.velocity);
  }

  isColliding(particle) {
    return this.position.every((coord, i) => coord === particle.position[i]);
  }
}

let readInput = (fileName) => {
  let particles = [];

  fs.readFileSync(fileName).toString().trim().split("\n").forEach((r, i) => {
    let properties = r.split(", ");

    properties = properties.map(p => {
      return p.match(/-?\d+\,-?\d+\,-?\d+/)[0].split(",").map(n => parseInt(n));
    });

    particles.push(new Particle(...properties));
  });

  return particles;
}

let solve = (particles) => {
  let j = 100;
  while(j > 0) {
    particles.forEach(p => p.move());

    particles.sort((a, b) => {
      return a.position[0] - b.position[0] || a.position[1] - b.position[1] || a.position[2] - b.position[2];
    });

    let indicesToDelete = new Set();
    let i = 0;
    while(i < particles.length - 1) {
      if(particles[i].isColliding(particles[i + 1])) {
        indicesToDelete.add(i);
        indicesToDelete.add(i + 1);
      }

      i++;
    }

    indicesToDelete = Array.from(indicesToDelete);

    while(indicesToDelete.length > 0) {
      particles.splice(indicesToDelete.pop(), 1);
    }

    j--;
  }

  return particles.length;
};

let testParticles = readInput("input_test_2.dat")

expect(solve(testParticles)).to.equal(1);

let particles = readInput("input.dat")

console.log(solve(particles));
