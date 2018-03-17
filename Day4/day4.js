const fs = require('fs');
const input = fs.readFileSync('Day4/input.txt').toString().trim().split('\n');

function checkPassphrase(passphrase) {
  const words = passphrase.split(' ');
  const set = new Set(words);
  return (words.length === new Set(words).size);
}

function validPassphrases(input) {
  return input.map(checkPassphrase).filter(x => x).length;
}

//console.log(validPassphrases(input));

// Part 2

function checkPassphrase2(passphrase) {
  const map = {};
  const words = passphrase.split(' ');
  let r = true;
  for (let i = 0; i < words.length; i++) {
    let chrs = words[i].split('').sort();
    if (map[chrs.toString()] != undefined)
      return false;
    else
      map[chrs.toString()] = 1;
  }
  return true;
}

function validPassphrases2(input) {
  return input.map(checkPassphrase2).filter(x => x).length;
}

console.log(validPassphrases2(input));


/* 

Other Solutions:

For Part 1:

For Part 2:
  - Instead of saving the anagrams characters in a map 
    I could have simply gone for the split('').sort().join('') 
    and reutilize the functions I made for Part 1, doing it all in one
    like this:

function checkPassphrase(passphrase) {
  let words = passphrase.split(' ');
  words = words.map( w => w.split('').sort().join('') );
  const set = new Set(words);
  return (words.length === new Set(words).size);
}
*/

