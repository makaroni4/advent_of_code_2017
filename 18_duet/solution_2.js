let fs = require('fs'),
    expect = require('chai').expect;

class Program {
  constructor(programID, otherProgramID, commands, messageQueues) {
    let commandIndex = 0;
    let registers = {
      p: programID
    };
    let extractValue = (key) => {
      return key.match(/\d+/) ? parseInt(key) : registers[key];
    }
    let commandsLength = commands.length;
    let commandIndexIsValid = (i) => {
      return i > -1 && i < commandsLength;
    }

    this.id = programID;
    this.sentValuesCounter = 0;

    this.state = "healthy";

    this.run = () => {
      while(commandIndexIsValid(commandIndex)) {
        let currentCommand = commands[commandIndex];

        switch (currentCommand[0]) {
          case "snd":
            this.sentValuesCounter += 1;
            messageQueues[otherProgramID].push(extractValue(currentCommand[1]))
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
            if(messageQueues[programID].length > 0) {
              registers[currentCommand[1]] = messageQueues[programID].shift();
            } else {
              this.state = "waiting";
              return;
            }

            break;
          case "jgz":
            if(extractValue(currentCommand[1]) > 0) {
              commandIndex += extractValue(currentCommand[2]) - 1;
            }
            break;
          default:
        }

        commandIndex += 1;
      }

      if(commandIndexIsValid(commandIndex)) {
        this.state = "indexOutOfRange";
      }
    }
  }
}

let solve = (commands) => {
  let messageQueues = {
    0: [],
    1: []
  };
  let program0 = new Program(0, 1, commands, messageQueues);
  let program1 = new Program(1, 0, commands, messageQueues);

  let programIsStuck = (program) => {
    return (program.state === "waiting" && messageQueues[program.id].length === 0) || program.state === "indexOutOfRange";
  }

  while(!(programIsStuck(program0) && programIsStuck(program1))) {
    program0.run();
    program1.run();
  }

  return program1.sentValuesCounter;
};

let readInput = (fileName) => {
  return fs.readFileSync(fileName).toString().trim().split("\n").map(r => r.split(" "));
}

let testCommands = readInput("test_input_2.dat");

expect(solve(testCommands)).to.equal(3);

let commands = readInput("input.dat");

console.log(solve(commands));
