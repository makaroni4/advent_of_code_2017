let fs = require('fs'),
    expect = require('chai').expect;

let spin = (input, spinSize) => {
  return input.slice(input.length - spinSize, input.length).concat(input.slice(0, input.length - spinSize));
}

expect(spin(["a", "b", "c", "d", "e"], 3)).to.eql(["c", "d", "e", "a", "b"]);
expect(spin(["a", "b", "c", "d", "e"], 1)).to.eql(["e", "a", "b", "c", "d"]);

let exchange = (input, positionA, positionB) => {
  let charB = input[positionB];

  input[positionB] = input[positionA];
  input[positionA] = charB;

  return input;
}

expect(exchange(["e", "a", "b", "c", "d"], 3, 4)).to.eql(["e", "a", "b", "d", "c"]);

let partner = (input, programA, programB) => {
  let positionA = input.indexOf(programA);
  let positionB = input.indexOf(programB);

  return exchange(input, positionA, positionB);
}

expect(partner(["a", "b", "c", "d", "e"], "b", "d")).to.eql(["a", "d", "c", "b", "e"]);

let readCommands = (commands) => {
  let output = [];

  commands.split(",").forEach(command => {
    switch (command.charAt(0)) {
      case "s":
        let spinSize = parseInt(command.slice(1 - command.length));
        output.push(["s", spinSize]);
        break;
      case "x":
        let [positionA, positionB] = command.slice(1 - command.length).split("/").map(x => parseInt(x));
        output.push(["x", positionA, positionB]);
        break;
      case "p":
        let [programA, programB] = command.slice(1 - command.length).split("/");
        output.push(["p", programA, programB]);
        break;
      default:
        console.log(`Wrong command ${command}`)
    }
  });

  return output;
}

let dance = (line, commands) => {
  commands.forEach(command => {
    switch (command[0]) {
      case "s":
        line = spin(line, command[1]);
        break;
      case "x":
        exchange(line, command[1], command[2]);
        break;
      case "p":
        partner(line, command[1], command[2]);
        break;
      default:
        console.log(`Wrong command ${command}`)
    }
  });

  return line;
};

expect(dance(["a", "b", "c", "d", "e"], readCommands("s1,x3/4,pe/b"))).to.eql(["b", "a", "e", "d", "c"]);

let rawCommands = fs.readFileSync("input.dat").toString().trim();
let commands = readCommands(rawCommands);

console.log("Part1 answer: ", dance("abcdefghijklmnop".split(""), commands).join(""));

let line = "abcdefghijklmnop".split("");
let seenLines = {};

for(let i = 0; i < 1000000000; i++) {
  line = dance(line, commands);

  if(seenLines[line]) {
    let repetitionPeriod = i - seenLines[line];
    i = i + Math.floor((1000000000 - i) / repetitionPeriod) * repetitionPeriod;
  } else {
    seenLines[line] = i;
  }
}

console.log("Part2 answer: ", line.join(""));
