let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let phrases = input.split("\n");

  return phrases.reduce((validCount, phrase) => {
    let words = phrase.split(" "),
        wordsSet = new Set(words);

    if (words.length === wordsSet.size) {
      validCount += 1;
    }

    return validCount;
  }, 0);
};

expect(solve("aa bb cc dd ee")).to.equal(1);
expect(solve("aa bb cc dd aa")).to.equal(0);
expect(solve("aa bb cc dd aaa")).to.equal(1);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
