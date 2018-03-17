// Hex Ed - Part I

const fs = require('fs');

const input = fs.readFileSync(__dirname + "/input.txt").toString().trim().split(',');

const initHex = {
  x: 0,
  y: 0
}

function findChild(input) {
  let maxDist = Number.MIN_VALUE; // Needed for Part II
  input.forEach( dir => {
    switch (dir) {
      case 'nw':
        initHex.x -= 1;
        break;
      case 'n':
        initHex.y -= 1;
        break;
      case 'sw':
        initHex.x -= 1;
        initHex.y += 1;
        break;
      case 'se':
        initHex.x += 1;
        break;
      case 'ne':
        initHex.x += 1;
        initHex.y -= 1;
        break;
      case 's':
        initHex.y += 1;
        break;
      default:
        break;
    }
    // Needed for Part II
    let dist = Math.abs(initHex.y);
    maxDist = Math.max(maxDist, dist);
  });
  return maxDist;
}

const maxDistance = findChild(input);

const childDistance = Math.abs(initHex.y);

console.log(childDistance); // Part I
console.log(maxDistance); // Part II

/* Part II

For this part I just kept track of the maximum distance he ever got from his starting position. 

Note:
This problem was rather easy to come up with a solution thanks to the in depth guide to hexagonal grids
I read (it's linked in the Bibliography). I just needed to know what would be the better approach to 
represent the hex grid and ended up using and Axial Coordinates system. It's all explained in the guide.

Simple example of the axial coordinate system to represent the hex grid:

SW(-1,1)|S(0,1) |
--------+-------+--------
NW(-1,0)| (0,0) |SE(1,0)
--------+------+---------
        |N(0,-1)|NE(1,-1)

Bibliography:
https://www.redblobgames.com/grids/hexagons/

*/