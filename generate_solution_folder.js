let fs = require('fs'),
    folder = process.argv[2];

if (!folder) {
  throw 'Provide a folder name';
}

if (!fs.existsSync(folder)){
  fs.mkdirSync(folder);
}

let solutionTemplate = `let fs = require('fs'),
    expect = require('chai').expect;

let solve = (input) => {
  // solution
};

expect(solve("")).to.equal();

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
`;

fs.writeFile(`${folder}/input.dat`, "PUT INPUT DATA HERE", (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`${folder}/input.dat was created.`);
});

fs.writeFile(`${folder}/solution.js`, solutionTemplate, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`${folder}/solution.js was created.`);
});
