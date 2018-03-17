
const input = [130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224];

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

//tieKnot(input, numbers, 0, 0);
//console.log(numbers[0] * numbers[1]);

/* Part II

For this part the tieKnotHash function was changed to receive the values that should be preserved
(current postion and skip size) because we'll run it 64 times.

*/

let input2 = "130,126,1,11,140,2,255,207,18,254,246,164,29,104,0,224"

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

console.log(tieKnotHash(input2, numbers));

/*

Tips:

For part 1, in the subarray reversing part I could have done it more elegantly by doing:

numbers = [...numbers.slice(currPos), ...numbers.slice(0, currPos)];
numbers = [...numbers.slice(0, length).reverse(), ...numbers.slice(length)];
numbers = [...numbers.slice(-currPos), ...numbers.slice(0, -currPos)];

For part 2, instead of having a auxilar function to get the sparse hash and then 
calculate the dense hash I could have done it this way:

for (let i = 0; i < 16; i++) {
    const o = numbers.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b);
    denseHash.push(o);
}

For part 2 I could have managed the hexadecimal padding a little better 
with String.prototype.padStart() this way:

denseHash.map(x => x.toString(16).padStart(2, '0')).join('')
*/