//Packet Scanners - Part I

const fs = require('fs');

const input = fs.readFileSync(__dirname + "/input.txt").toString().trim().split('\n');

function createFirewall(input) {
  const firewall = {};

  input.forEach(line => {
    const depthRange = line.split(": ");
    firewall[parseInt(depthRange[0])] = parseInt(depthRange[1]);
  });

  return firewall;
}

const firewall = createFirewall(input);

function packetScanner(firewall) {
  let severity = 0;
  const keys = Object.keys(firewall);

  keys.forEach(pos => {
    if (((pos) % (2 * (firewall[pos] - 1))) == 0) {
      severity += pos * firewall[pos];
    }
  });

  return severity;

}

const part1 = packetScanner(firewall);
console.log(part1)

// Part 2

function findDelay(firewall) {
  const guards = input.map( line => {
    const l = line.split(": ");
    return [parseInt(l[0]), parseInt(l[1])];
  })

  let delay = 0;
  const caughtByGuard = delay => ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
  while (guards.some(caughtByGuard(delay)))
    delay++;
  return delay;
}

const part2 = findDelay(firewall);
console.log(part2);

/*
Why:

let delay = -1;    
while (guards.some( ([r, d]) => (++delay + d) % (2 * (r - 1)) === 0));

is so much slower than:

let delay = 0;
const caughtByGuard = delay => ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
while (guards.some(caughtByGuard(delay)))
  delay++;

Answer:

while (guards.some(caughtByGuard(++delay)));

This will increment delay only once per some call, when a caughtByGuard closure 
gets created with pre-incremented delay stored in it. Each instance of caughtByGuard 
function will use the same delay value for each guard in guards.

while (guards.some( ([r, d]) => (++delay + d) % (2 * (r - 1)) === 0));

This will re-evaluate everything after the arrow for each guard on each run of the while loop, 
so instead of using the same delay for all guards it increments it after each guard. 
This at the very least would produce an invalid result and with some bad luck cause an infinite loop.

I like the conciseness, but this kind of a bug (easy to make, hard to catch) is why using unary
increments (esp. paired with putting multiple statements into one line) is considered to be a 
bad practice.


-----------------------------------------------------------------------

pos % (2 * (firewall[pos] - 1)) == 0 explanation:

Let's say range (firewall[pos]) is 5:

    Let's first open up what does range 5 mean
        Range 5 means the number goes to 2,3,4,5 before coming back to 4,3,2,1 (starting from 1)
        We can turn it into an Array of 8 numbers that loops, 2,3,4,5,4,3,2,1. Let's call this RangeArray

    With the 'firewall[pos] - 1' you basically say that the scanner reaches midpoint after 
    4 steps (1-> 5, 5-> 1), and thus by doubling it you gain the length of the RangeArray.

    Don't know if it makes more sense this way, but another way to write the math would 
    be "time % 2*range-2" where the "-2" means that you cut off the repeated end points, 
    so it's [1,2,3,4,5,4,3,2] instead of [1,2,3,4,5,5,4,3,2,1] 
    (ofc the values inside array doesn't matter because only thing that matters is if the 
    scanner is at index 0 or not)
*/