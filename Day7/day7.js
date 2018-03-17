/* Recursive Circus - Part I

For part 1 the input file was very similar to a dot notation, so I just edited de input file with ViM.

dot -T svg input.dot > towers2.svg

And searched for the root by myself.

*/

// Part II

const fs = require('fs');

const input = fs.readFileSync(__dirname + "/input.txt").toString().trim().split('\n');


function createDisks(input) {

  const disks = {};

  input.forEach((line) => {
    const parts = line.split(' -> ');
    const disk = parts[0].split(' ');
    const name = disk[0].trim();
    disks[name] = {
      value: Number(disk[1].substr(1, disk[1].indexOf(')') - 1)),
      children: [],
      total: 0,
    };
    if (parts.length > 1) {
      disks[name].children = parts[1].split(',').map((x) => x.trim());
    }
  });
  return disks;
}

const disks = createDisks(input);

function sumWeights(root, tree) {
  tree[root].total = tree[root].value;
  tree[root].children.forEach((c) => {
    tree[root].total += sumWeights(c, tree);
  });

  return tree[root].total;
}

function balance(root, tree, target) {
  const children = {};
  var newTarget;
  tree[root].children.forEach((c) => {
    if (children[tree[c].total] === undefined) {
      children[tree[c].total] = c;
    } else {
      children[tree[c].total] = false;
      newTarget = tree[c].total;
    }
  });
  for (const i in children) {
    if (children[i]) {
      return balance(children[i], tree, newTarget);
    }
  }

  return tree[root].value + target - tree[root].total;
}

sumWeights('hmvwl', disks);
console.log(balance('hmvwl', disks));