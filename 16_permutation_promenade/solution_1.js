let fs = require('fs'),
    expect = require('chai').expect;

let spin = (input, spinSize) => {
  return input.slice(input.length - spinSize, input.length).concat(input.slice(0, input.length - spinSize));
}

expect(spin("abcde", 3)).to.equal("cdeab");
expect(spin("abcde", 1)).to.equal("eabcd");

let replaceAt = (input, index, newChar) => {
  return input.slice(0, index).concat(newChar).concat(input.slice(index + 1, input.length));
}

expect(replaceAt("abcde", 0, "x")).to.equal("xbcde");
expect(replaceAt("abcde", 3, "x")).to.equal("abcxe");
expect(replaceAt("abcde", 4, "x")).to.equal("abcdx");

let exchange = (input, positionA, positionB) => {
  let charB = input.charAt(positionB);

  input = replaceAt(input, positionB, input[positionA]);
  input = replaceAt(input, positionA, charB);

  return input;
}

expect(exchange("eabcd", 3, 4)).to.equal("eabdc");

let partner = (input, programA, programB) => {
  let positionA = input.indexOf(programA);
  let positionB = input.indexOf(programB);

  return exchange(input, positionA, positionB);
}

expect(partner("abcde", "b", "d")).to.equal("adcbe");

let solve = (line, commands) => {
  commands.split(",").forEach(command => {
    switch (command.charAt(0)) {
      case "s":
        let spinSize = parseInt(command.slice(1 - command.length));
        line = spin(line, spinSize);
        break;
      case "x":
        let [positionA, positionB] = command.slice(1 - command.length).split("/").map(x => parseInt(x));
        line = exchange(line, positionA, positionB);
        break;
      case "p":
        let [programA, programB] = command.slice(1 - command.length).split("/");
        line = partner(line, programA, programB);
        break;
      default:
        console.log(`Wrong command ${command}`)
    }
  });

  return line;
};

expect(solve("abcde", "s1,x3/4,pe/b")).to.equal("baedc");

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve("abcdefghijklmnop", input));
