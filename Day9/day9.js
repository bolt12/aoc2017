/* Stream Processing - Part I

  Treated the input in ViM using these commands:

  :%s/!.//g -> substitute every ocurrence of any character that begins 
               with '!' and it's proceeded by any other character, by nothing.

  :%s/<[^>]*>//g -> substitute every ocurrence of any character that begins 
                    with '<' and can be proceeded by any other character execpt for '>', by nothing.
  

  :%s/!.//g -> substitute every ocurrence of the character ',', by nothing.
*/

const fs = require('fs');

const input = fs.readFileSync(__dirname + "/part1.txt").toString().trim().split("");

function streamProcess(stream) {
  const depths = [];

  let depth = 0;
  let total = 0;
  stream.forEach( c => {
    if (c == '{') {
      depth++;
      total += depth;
    }
    else if (c == '}') {
      depth--;
    }
  });
  return total;
}

console.log(streamProcess(input));

/* Part II

  Treated the input in ViM using these commands:

  :%s/!.//g -> substitute every ocurrence of any character that begins 
               with '!' and it's proceeded by any other character, by nothing.

*/

const input2 = fs.readFileSync(__dirname + "/part2.txt").toString().trim().split("");

function countGarbage(stream) {
  let total = 0;
  garbage = false;
  stream.forEach( c => {
    if (c == '>') {
      garbage = false;
    }
    else if (garbage) {
      total ++;
    }
    else if (c == '<') {
      garbage = true;
    }
  });
  return total;
}

console.log(countGarbage(input2));

/*

I could have not treated the input with ViM and process the stream by myself adding a condition for '!'
and using two variables, one to store the depth total and other the garbage count. 
The performance impact wouldn't be noticeable.

*/