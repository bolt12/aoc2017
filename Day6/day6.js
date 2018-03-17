const input = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];

function redistribute(banks) {
  const states = {};
  let state = input.toString();
  let cycles = 0;

  while (states[state] == undefined) {
    states[state] = 1;
    let [max, maxIdx] = banks.reduce((acc, curr, i) => acc[0] < curr ? [curr, i] : acc, [Number.MIN_VALUE, -1]);
    let block = maxIdx;
    banks[block] = 0
    while (max > 0) {
      block = (block + 1) % banks.length;
      banks[block]++;
      max--;
    }
    state = banks.toString();
    cycles++
  }

  console.log(cycles); // Part 1
  console.log(cycles - Object.keys(states).indexOf(state)); // Part 2
  return cycles;
}

redistribute(input);


/* Part 2

Since I kept track of all the states, for part 2 I just needed to get the difference between
the total of number of cycles needed to end the infinite loop
and the position where the state that triggered the end of the loop was first seen.

Tips:
  - Check Floyd's cycle-finding algorithm.

*/