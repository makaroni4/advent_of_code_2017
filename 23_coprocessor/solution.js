let fs = require("fs"),
    expect = require("chai").expect;

let solve = (commands) => {
  let registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0
  };
  let extractValue = (key) => {
    return key.match(/\d+/) ? parseInt(key) : registers[key];
  }

  let i = 0;
  let commandsLength = commands.length;
  let mulCount = 0;

  while(i > -1 && i < commandsLength) {
    let currentCommand = commands[i];

    switch (currentCommand[0]) {
      case "set":
        registers[currentCommand[1]] = extractValue(currentCommand[2]);
        break;
      case "sub":
        registers[currentCommand[1]] -= extractValue(currentCommand[2]);
        break;
      case "mul":
        registers[currentCommand[1]] *= extractValue(currentCommand[2]);
        mulCount++;
        break;
      case "jnz":
        if(extractValue(currentCommand[1]) !== 0) {
          i += extractValue(currentCommand[2]) - 1;
        }
        break;
      default:
    }

    i += 1;
  }

  return mulCount;
};

let readInput = (fileName) => {
  return fs.readFileSync(fileName).toString().trim().split("\n").map(r => r.split(" "));
}

let commands = readInput("input.dat");

console.log(solve(commands));
