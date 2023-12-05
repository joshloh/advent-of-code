import * as fs from 'fs';

type Day2Solution = {
  isPossible: boolean;
  cubePower: number;
}

function processLine(str: string): Day2Solution {
  // initialise output
  let output: Day2Solution = {
    isPossible: true,
    cubePower:0
  }
  // maximum block values for part 1
  let maxR = 12;
  let maxG = 13;
  let maxB = 14;

  // minimum required block values for part 2
  let minR = 0;
  let minG = 0;
  let minB = 0;

  // remove the Game 1:
  const game = str.split(':')[1];
  
  // for each sequence
  const sequences = game.split(';');
  for (const seq of sequences) {
    // split sequence into pairs
    const pairs = seq.split(',');
    for (const pair of pairs) {
      // split pairs into num + colour
      const block = pair.split(' ');
      const num = parseInt(block[1]);
      const colour = block[2];
      // if number exceeds max, then isPossible is false
      // if number exceeds current required min, then update
      if (colour == 'red') {
        if (num > maxR) output.isPossible = false;
        if (num > minR) minR = num;
      }
      if (colour == 'green') {
        if (num > maxG) output.isPossible = false;
        if (num > minG) minG = num;
      }
      if (colour == 'blue') {
        if (num > maxB) output.isPossible = false;
        if (num > minB) minB = num;
      }
    }
  }
  output.cubePower = minR * minG * minB;
  return output;
}

// tests
type TestCase = {
  in: string;
  out: Day2Solution;
}

const testCases: TestCase[] = [
  { in: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', out: { isPossible: true, cubePower: 48 }},
  { in: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', out: { isPossible: true, cubePower: 12 }},
  { in: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', out: { isPossible: false, cubePower: 1560 }},
  { in: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', out: { isPossible: false, cubePower: 630 }},
  { in: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', out: { isPossible: true, cubePower: 36 }},
]

function isEqual(a: Day2Solution, b: Day2Solution) {
  return (a.isPossible == b.isPossible && a.cubePower == b.cubePower);
}

let testSum1 = 0;
let testSum2 = 0;
let testIndex = 0;
for (const test of testCases) {
  testIndex++;
  const res = processLine(test.in);
  if (!isEqual(res, test.out)) {
    console.log(`FAIL: expected ${test.out} but got ${res}`);
  } else {
    console.log('PASS');
  }
  if (res.isPossible) testSum1 += testIndex;
  testSum2 += res.cubePower
}
console.log(testSum1);
console.log(testSum2);

// main
const file = fs.readFileSync('./day2.txt', 'utf-8');
const inputs = file.split('\r\n');

let sum = 0;
let sum2 = 0;
let index = 0;
for (const input of inputs) {
  const res: Day2Solution = processLine(input)
  index++;
  if (res.isPossible) {
    sum += index;
  }
  sum2 += res.cubePower;
}
console.log(`Part 1 answer: ${sum}`);
console.log(`Part 2 answer: ${sum2}`);

