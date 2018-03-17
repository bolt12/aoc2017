/* Tie Knot Hash Function */


let numbers = Array.from(Array(256).keys());

function tieKnot(input, numbers, currentPosition, skip){
  let currPos = currentPosition; // Needed for part 2
  let skipSize = skip; // Needed for part 2

  input.forEach(length => {
    let start = currPos;
    let end;
    if(length <= numbers.length){
      end = (start + length - 1) % numbers.length;
      let newArr = [];
      for(let i = start, j = 0; j < length ; i = (i+1)%numbers.length, j++) {
        newArr[j] = numbers[i];
      }
      newArr.reverse();
      for(let i = start, j = 0; j < length; i = (i+1)%numbers.length, j++) {
        numbers[i] = newArr[j];
      }
      currPos = (currPos + length + skipSize) % numbers.length;
      skipSize++;
    }
  });
  return {currPos: currPos, skipSize}; // Needed for part 2
}


function tieKnotHash(string, numbers) {
  const extra = [17, 31, 73, 47, 23];
  const lengths = string.split("").map((c, i) => string.charCodeAt(i)).concat(extra);

  let status = {currPos: 0, skipSize: 0};

  for(let i = 0; i < 64; i++) {
    status = tieKnot(lengths, numbers, status.currPos, status.skipSize);
  }

  const sparseHash = getSparseHash(numbers);
  const denseHash = sparseHash.map( block => block.reduce( (prev, curr) => curr ^ prev )); 
  
  return denseHash.map( n => {
    let b = n.toString(16);
    if(b.length == 1)
      return '0' + b;
    return b;
  }).join("");

  //OR return denseHash.map(x => x.toString(16).padStart(2, '0')).join('');
}

function getSparseHash(numbers) {
  let i = 16;
  let lastI = 0;
  let j = 0;
  const sparseHash = [];
  while (i <= numbers.length){
    sparseHash[j] = numbers.slice(lastI,i);
    lastI = i
    i += 16;
    j++;
  }
  return sparseHash;
}


// Disk Defragmentation - Part I

const fs = require('fs');
const input = "wenycdww";

function fragCount(input) {
  const numbers = Array.from(Array(256).keys());
  const matrix = [];
  let count = 0;

  for(let i = 0; i < 128; i++) {
    let string = input + "-" + i;
    matrix[i] = tieKnotHash(string, numbers).split("")
                .map( hex => parseInt(hex, 16).toString(2))
                .join("");
  }

  for(let i = 0; i < 128; i++) {
    count += matrix[i].split("").reduce( (acc, curr) => curr === '1' ? acc+1 : acc, 0);
  }

  console.log(count);
  return count;

}

fragCount("flqrgnkx");