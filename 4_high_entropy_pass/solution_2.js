let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  let phrases = input.split("\n");

  return phrases.reduce((validCount, phrase) => {
    let words = phrase.split(" ").map(word => {
          return word.split('').sort().join('');
        }),
        wordsSet = new Set(words);

    if (words.length === wordsSet.size) {
      validCount += 1;
    }

    return validCount;
  }, 0);
};

expect(solve("abcde fghij")).to.equal(1);
expect(solve("abcde xyz ecdab")).to.equal(0);
expect(solve("a ab abc abd abf abj")).to.equal(1);
expect(solve("iiii oiii ooii oooi oooo")).to.equal(1);
expect(solve("oiii ioii iioi iiio")).to.equal(0);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
