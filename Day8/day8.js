// I Heard You Like Registers - Part I

const fs = require('fs');

const input = fs.readFileSync(__dirname + "/input.txt").toString().trim().split('\n');

const registers = new Map();

function runInstructions(instructions) {
  let part2 = -999999;
  instructions.forEach((line) => {
    const separator = line.indexOf('if') - 1;
    const inst = line.substring(0, separator).split(" ");
    let cond = line.substring(separator + 4, line.length).split(" ");
    const condReg = cond[0].slice(0);

    cond[0] = "registers.get('" + condReg + "')";

    cond = cond.join("");

    const reg = inst[0];
    const op = inst[1];
    const instValue = parseInt(inst[2]);
    if (registers.get(reg) == undefined) {
      registers.set(reg, 0);
    }
    if (registers.get(condReg) == undefined) {
      registers.set(condReg, 0);
    }
    if (eval(cond)) {
      const oldVal = registers.get(reg);
      switch (op) {
        case 'inc':
          registers.set(reg, oldVal + instValue);
          part2 = part2 > oldVal + instValue ? part2 : oldVal + instValue;
          break;
        case 'dec':
          registers.set(reg, oldVal - instValue);
          part2 = part2 > oldVal - instValue ? part2 : oldVal - instValue;
          break;
        default:
          break;
      }
    }
  });
  console.log(part2)
}

runInstructions(input);
console.log(Array.from(registers.values()).reduce((acc, curr) => curr >= acc ? curr : acc));

/* Part 2

For part 2 I just have a variable to keep track the maximum value that have appeared in each instruction.
Everytime a new instruction is calculated the variable checks the new value calculated and checks if 
the old maximum value is less than the new value.

*/
