let fs = require('fs'),
    expect = require('chai').expect;

let solve = (commands) => {
  let registers = {};
  let playedFrequencies = [];

  let extractValue = (key) => {
    return key.match(/\d+/) ? parseInt(key) : registers[key];
  }

  let i = 0;
  let commandsLength = commands.length;

  while(i > -1 && i < commandsLength) {
    let currentCommand = commands[i];

    switch (currentCommand[0]) {
      case "snd":
        playedFrequencies.push(extractValue(currentCommand[1]));
        break;
      case "set":
        registers[currentCommand[1]] = extractValue(currentCommand[2]);
        break;
      case "add":
        registers[currentCommand[1]] += extractValue(currentCommand[2]);
        break;
      case "mul":
        registers[currentCommand[1]] *= extractValue(currentCommand[2]);
        break;
      case "mod":
        registers[currentCommand[1]] = registers[currentCommand[1]] % extractValue(currentCommand[2]);
        break;
      case "rcv":
        if(extractValue(currentCommand[1]) !== 0) {
          let lastFrequency = playedFrequencies.slice(-1);

          return lastFrequency[0];
        }
        break;
      case "jgz":
        if(extractValue(currentCommand[1]) > 0) {
          i += extractValue(currentCommand[2]) - 1;
        }
        break;
      default:
    }

    i += 1;
  }
};

let readInput = (fileName) => {
  return fs.readFileSync(fileName).toString().trim().split("\n").map(r => r.split(" "));
}

let testCommands = readInput("test_input_1.dat");

expect(solve(testCommands)).to.equal(4);

let commands = readInput("input.dat");

console.log(solve(commands));
