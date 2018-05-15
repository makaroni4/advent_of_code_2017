let fs = require('fs'),
    expect = require('chai').expect;

const dupObject = (o) => (
  JSON.parse(JSON.stringify(o))
)

const removeFromArray = (array, el) => {
  array.splice(array.indexOf(el), 1);
}

let readInput = (fileName) => {
  return fs.readFileSync(fileName).toString().trim().
    split("\n").
    map(r => r.split("/").
    map(c => parseInt(c)));
}

let solve = (inputFileName) => {
  const components = readInput(inputFileName);

  let strength = (bridge) => {
    return bridge.indices.map(i => components[i]).map(c => c.reduce((a, b) => a + b)).reduce((a, b) => a + b);
  }

  let queue = [];
  let maxStrength = 0;
  let maxLength = 0;

  components.forEach((c, i) => {
    if(c.indexOf(0) > -1) {
      queue.push({
        indices: [i],
        lastComponent: c.find(v => v !== 0)
      });
    }
  });

  while(queue.length > 0) {
    let bridge = queue.pop();

    components.forEach((c, i) => {
      if(c.indexOf(bridge.lastComponent) > -1 && bridge.indices.indexOf(i) === -1) {
        let newBridge = dupObject(bridge);
        newBridge.indices.push(i);
        newBridge.lastComponent = c[1 - c.findIndex(v => v === bridge.lastComponent)];
        queue.push(newBridge);
      } else {
        let currentStrength = strength(bridge);
        let currentLength = bridge.indices.length;

        if(currentLength > maxLength || (currentLength === maxLength && currentStrength > maxStrength)) {
          maxStrength = currentStrength;
          maxLength = currentLength;
        }
      }
    });
  }

  return maxStrength;
};

expect(solve("test_input.dat")).to.equal(19);

console.log(solve("input.dat"));
