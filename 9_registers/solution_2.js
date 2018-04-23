let fs = require('fs'),
    expect = require('chai').expect;

let evalCondition = (context, condition) => {
  let [conditionVar, conditionOperator, conditionValue] = condition.split(" ");

  if(!context.hasOwnProperty(conditionVar)) {
    context[conditionVar] = 0;
  }

  let result;

  switch(conditionOperator) {
    case "==":
      result = context[conditionVar] == parseInt(conditionValue);
      break;
    case ">=":
      result = context[conditionVar] >= parseInt(conditionValue);
      break;
    case "<=":
      result = context[conditionVar] <= parseInt(conditionValue);
      break;
    case "!=":
      result = context[conditionVar] != parseInt(conditionValue);
      break;
    case ">":
      result = context[conditionVar] > parseInt(conditionValue);
      break;
    case "<":
      result = context[conditionVar] < parseInt(conditionValue);
      break;
    default:
      console.log(`--> New condition operator ${conditionOperator}`);
  }

  return result;
}

expect(evalCondition({}, "a == 0")).to.equal(true);
expect(evalCondition({}, "a == 1")).to.equal(false);
expect(evalCondition({}, "a >= -5")).to.equal(true);
expect(evalCondition({a: -10}, "a >= -5")).to.equal(false);
expect(evalCondition({}, "a <= 5")).to.equal(true);

let evalOperation = (context, command) => {
  let [operationVar, operator, delta] = command.split(" ");

  if(!context.hasOwnProperty(operationVar)) {
    context[operationVar] = 0;
  }

  let result;

  switch(operator) {
    case "inc":
      result = context[operationVar] += parseInt(delta);
      break;
    case "dec":
      result = context[operationVar] -= parseInt(delta);
      break;
    default:
      console.log(`--> New operator ${conditionOperator}`);
  }

  return result;
}

expect(evalOperation({}, "a inc 5")).to.equal(5);
expect(evalOperation({a: 5}, "a inc 5")).to.equal(10);

let solve = (input) => {
  let context = {},
      maxValueEver = 0;

  input = input.split("\n").map(x => x.split(" if "));

  input.forEach(row => {
    let [command, condition] = row;

    if(evalCondition(context, condition)) {
      let newValue = evalOperation(context, command);

      if(newValue > maxValueEver) {
        maxValueEver = newValue;
      }
    }
  });

  return maxValueEver;
};

expect(solve(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`)).to.equal(10);

let input = fs.readFileSync("input.dat").toString().trim();

console.log(solve(input));
