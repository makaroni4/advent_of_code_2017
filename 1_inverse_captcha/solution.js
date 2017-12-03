let fs = require("fs"),
    input = fs.readFileSync("input.dat").toString().trim(),
    prevDigit = input.slice(-1),
    sum = 0;

for (const ch of input) {
  if (ch === prevDigit) {
    sum += parseInt(ch, 10);
  }

  prevDigit = ch;
}

console.log(sum);
