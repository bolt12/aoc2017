// Part I

const input = 325489;

function distManhattan(input) {
  let matrixSize = Math.ceil(Math.sqrt(input));

  if (matrixSize % 2 == 0)
    matrixSize++;

  const lowerRight = matrixSize * matrixSize;
  const lowerLeft = lowerRight - (matrixSize - 1);
  const upperLeft = lowerLeft - (matrixSize - 1);
  const upperRight = upperLeft - (matrixSize - 1);
  const dist1 = (matrixSize - 1) / 2;
  let dist2 = 0;

  if (lowerLeft < input && input < lowerRight) {
    dist2 = Math.abs(lowerRight - dist1 - input);
  }

  else if (upperLeft < input && input < lowerLeft) {
    dist2 = Math.abs(lowerLeft - dist1 - input);
  }

  else if (upperRight < input && input < upperLeft) {
    dist2 = Math.abs(upperLeft - dist1 - input);
  }

  else {
    dist2 = Math.abs(upperRight - dist1 - input);
  }

  return (dist1 + dist2);
}

//console.log(distManhattan(1));

// Part II

let map = {
};

function spiral(matrixSize) {
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = -1;

  const positions = [];

  for (let i = 0; i < (matrixSize * matrixSize); i++) {

    if (((-matrixSize/2) < x && x <= (matrixSize/2)) && ((-matrixSize / 2) < y && y <= (matrixSize/2))) {
        positions.push([x,y]);
    }
    if ((x == y) || (x < 0 && x == -y) || (x > 0 && x == 1-y)) {
      let aux = dx;
      dx = -dy;
      dy = aux;
    }
    x = x + dx;
    y = y + dy;
  }
  return positions;
}

function createSquaresPos(centerDist, oldArray) {
  const positions = [];
  const matrixSize = 2 * centerDist + 1;

  const newArray = spiral(matrixSize);

  let oldArrayString = oldArray.map(x => x.toString());
  let newArrayString = newArray.map(x => x.toString());
  let difference = newArrayString.filter(x => oldArrayString.indexOf(x) < 0).filter(x => x != '0,0');

  difference = difference.map(x => x.split(',').map(x => parseInt(x)));

  return difference;
}

function adjacentSum(square) {
  let x = square.x;
  let y = square.y;
  let sum = 0;
  if (map[[x + 1, y].toString()] != undefined) {
    sum += map[[x + 1, y].toString()].value;
  }
  if (map[[x + 1, y + 1].toString()] != undefined) {
    sum += map[[x + 1, y + 1].toString()].value;
  }
  if (map[[x, y + 1].toString()] != undefined) {
    sum += map[[x, y + 1].toString()].value;
  }
  if (map[[x - 1, y + 1].toString()] != undefined) {
    sum += map[[x - 1, y + 1].toString()].value;
  }
  if (map[[x - 1, y].toString()] != undefined) {
    sum += map[[x - 1, y].toString()].value;
  }
  if (map[[x - 1, y - 1].toString()] != undefined) {
    sum += map[[x - 1, y - 1].toString()].value;
  }
  if (map[[x, y - 1].toString()] != undefined) {
    sum += map[[x, y - 1].toString()].value;
  }
  if (map[[x + 1, y - 1].toString()] != undefined) {
    sum += map[[x + 1, y - 1].toString()].value;
  }
  square.value = sum;
  return square;
}

function createSpiral(input) {

  let sq = {
    x: 0,
    y: 0,
    value: 1
  };

  let value = sq.value;
  let centerDist = 1;
  let squarePositions = [[1, 0], [1, 1], [0, 1], [-1, +1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  let usedSqPositions = [];
  let pos = 0;

  map[[sq.x, sq.y]] = sq;

  while (value < input) {
    let newSquare = {
    };
    pos = pos % squarePositions.length;
    if (pos == 0) {
      if (centerDist > 1){
        usedSqPositions = usedSqPositions.concat(squarePositions);
        squarePositions = createSquaresPos(centerDist, usedSqPositions);
      }
      centerDist++;
      pos = 0;
    }
    let coords = squarePositions[pos];
    newSquare.x = sq.x + coords[0];
    newSquare.y = sq.y + coords[1];
    pos++;
    newSquare = adjacentSum(newSquare);
    map[[newSquare.x, newSquare.y]] = newSquare;
    value = newSquare.value;
    console.log(newSquare);
  }
  return value;
}

console.log(createSpiral(input));

/*
Spiral source code adapted to javascript:
https://stackoverflow.com/questions/398299/looping-in-a-spiral

Other solutions:

For part 1:

For part 2:
- https://oeis.org/A141481 (On-Line Encyclopedia of Integer Sequences)
*/