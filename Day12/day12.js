const fs = require('fs');

let input = fs.readFileSync(__dirname + "/input.txt").toString().trim().split('\n');

function createGraph(input) {
  const progPipes = {};

  input.forEach(line => {
    const progs = line.split(" <-> ");
    progPipes[parseInt(progs[0])] = progs[1].split(',').map(x => parseInt(x));
  });

  return progPipes;
}

function dfsCount(node, graph, count, visited) {
  if (visited[node])
    return count;

  count++;
  visited[node] = true;
  const toVisit = graph[node];
  for (let i = 0; i < toVisit.length; i++)
    count = dfsCount(toVisit[i], graph, count, visited);
  return count;
}

const graph = createGraph(input);
let r = dfsCount(0, graph, 0, {});

console.log(r);

// Part II

function dfsGroupFind(node, graph, visited) {
  if (visited[node])
    return false;

  count = true;
  visited[node] = true;
  const toVisit = graph[node];
  for (let i = 0; i < toVisit.length; i++)
    count = dfsGroupFind(toVisit[i], graph, visited) || count;
  return true;
}

function groupCount(graph) {
  const visited = {};
  const keys = Object.keys(graph);
  let total = 0;

  for(let i = 0; i < keys.length; i++) {
    let r = dfsGroupFind(keys[i], graph, visited);
    if(r) {
      total++;
    }
  }
  return total;
}

let part2 = groupCount(graph);
console.log(part2);

/*

For part 1 I just created the input file corresponding graph and then, using a DFS algorithm,
 walked through the graph in search for every node directly and indirectly connected to the starting one.

For part 2 I used a similar approach but this time what was asked was the number of groups and not
the number of nodes in a group. With this in mind I traversed the graph DFS style for every node while 
keeping track of all the nodes visited. If for every iteration the algorithm finds a new node that wasn't 
connected in the group of the previous iterations then it belongs to a new group.

I created a svg file with the graphic version of the groups using graphviz it helped me understand
how to search the total number of groups.
I could have gone for a BFS traversal but since I needed to search the entire Tree for each group 
there would be no performance impacts, DFS is much more easier to implement though.
*/