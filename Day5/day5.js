// A Maze of Twisty Trampolines, All Alike - Part I

const fs = require('fs');
const input = fs.readFileSync(__dirname + "/input.txt")
                .toString()
                .trim()
                .split('\n')
                .map(n => parseInt(n));

function mazeEscape(jumps) {
  let currPos = 0;
  let offset = jumps[currPos];
  const end = jumps.length;
  let steps = 0;

  while (currPos < end && offset < end) {
    
    /* Part 2
    if(offset >= 3)
      jumps[currPos]--;
    else
    */
      jumps[currPos]++;
    currPos += offset;
    offset = jumps[currPos];
    steps++;

  }

  return steps;

}

console.log(mazeEscape(input));

/* Part 2

Simply add a condition, if the offset is 3 or more then the jump is decreased by one,
 otherwise it is incremented.


Tips: 

It is possible to map strings to number using the Number constructor:

  data.split('\n').map(Number);
*/

