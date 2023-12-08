import * as fs from 'fs';

type LR = {
  left: string;
  right: string;
}

type Day8Input = {
  directions: string;
  firstNode: string;
  nodeMap: Map<string,LR>;
}

function parse(file: string): Day8Input {
  const nodeMap =  new Map();
  const [directions, nodesString] = file.split('\r\n\r\n');
  const firstNode = nodesString.split('\r\n')[0].split(' ')[0];
  nodesString.split('\r\n').forEach(
    (e) => {
      const value = e.split(' ')[0];
      const left = e.split(' (')[1].split(', ')[0];
      const right = e.split(', ')[1].split(')')[0];
      nodeMap.set(value, { left, right });
    }
  );
  return {
    directions,
    firstNode,
    nodeMap
  };
}

function solve1(file: string, startNode: string, hasArrived: (currNode: string) => boolean): number {
  const input = parse(file);
  let currNode = startNode;
  let moves = 0; 
  while(!hasArrived(currNode)) {
    const direction = input.directions[moves % input.directions.length];
    let nextNode;
    if (direction == 'L') {
      nextNode = input.nodeMap.get(currNode)?.left;
    } else if (direction == 'R') {
      nextNode = input.nodeMap.get(currNode)?.right;
    } else {
      console.log('uh oh');
      return -1;
    }
    if (!nextNode) {
      return -1;
    } else {
      currNode = nextNode;
    }
    moves++;
    if (nextNode == 'ZZZ') {
      return moves;
    }
  }
  return moves;
}

function gcd(a: number, b: number): number { return a ? gcd(b % a, a) : b; }

function lcm(a: number, b: number): number { return  a * b / gcd(a, b); }

function solve2(file: string): number {
  const input = parse(file);
  const allNodesEndingWithA: string[] = [];
  input.nodeMap.forEach((v,k) => {
    if (k[2] == 'A') {
      allNodesEndingWithA.push(k);
    }
  });
  const counts = [];
  for (const a of allNodesEndingWithA) {
    counts.push(solve1(file, a, (currNode) => {
      return currNode[2] == 'Z';
    }));
  }
  return counts.reduce(lcm);
}

// tests
const tfile = fs.readFileSync('./day8.test.txt', 'utf-8');
console.log(`Test 1 solution: ${solve1(tfile, 'AAA', (currNode) => {return currNode == 'ZZZ';})}`);
console.log(`Test 2 solution: ${solve2(tfile)}`);

// main
const file = fs.readFileSync('./day8.txt', 'utf-8');
console.log(`Part 1 solution: ${solve1(file, 'AAA', (currNode) => {return currNode == 'ZZZ';})}`);
console.log(`Part 2 solution : ${solve2(file)}`);
