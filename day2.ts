import * as fs from 'fs';
// functions

function isPossible(str: string): boolean {
  // remaining block count
  let red = 12;
  let green = 13;
  let blue = 14;

  const game = str.split(':')[1];
  const sequences = game.split(';');

  // for each sequence
  for (const seq of sequences) {
    const pairs = seq.split(',');
    for (const pair of pairs) {
      const block = pair.split(' ');
      if (block[2] == 'red') {
        if (parseInt(block[1]) > red) return false;
      }
      if (block[2] == 'green') {
        if (parseInt(block[1]) > green) return false;
      }
      if (block[2] == 'blue') {
        if (parseInt(block[1]) > blue) return false;
      }
    }
  }
  return true;
}

function fewestCubes(str: string): number {
  // remaining block count
  let red = 0;
  let green = 0;
  let blue = 0;

  const game = str.split(':')[1];
  const sequences = game.split(';');

  // for each sequence
  for (const seq of sequences) {
    const pairs = seq.split(',');
    for (const pair of pairs) {
      const block = pair.split(' ');
      if (block[2] == 'red') {
        if (parseInt(block[1]) > red) red = parseInt(block[1]);
      }
      if (block[2] == 'green') {
        if (parseInt(block[1]) > green) green = parseInt(block[1]);
      }
      if (block[2] == 'blue') {
        if (parseInt(block[1]) > blue) blue = parseInt(block[1]);
      }
    }
  }
  return red * green * blue;
}

// tests
// { in: , out: },
const testCases = [
  { in: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', out: true},
  { in: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', out: true},
  { in: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', out: false},
  { in: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', out: false},
  { in: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', out: true},
]

let testSum = 0;
let testIndex = 0;
for (const test of testCases) {
  testIndex++;
  const res = isPossible(test.in);
  if (res != test.out) {
    console.log(`FAIL: expected ${test.out} but got ${res}`);
  } else {
    console.log('PASS');
  }
  if (res) testSum += testIndex;
}

console.log(testSum);

const testCases2 = [
  { in: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', out: 48},
  { in: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', out: 12},
  { in: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', out: 1560},
  { in: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', out: 630},
  { in: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', out: 36},
]

let testSum2 = 0;
for (const test of testCases2) {
  testIndex++;
  const res = fewestCubes(test.in);
  if (res != test.out) {
    console.log(`FAIL: expected ${test.out} but got ${res}`);
  } else {
    console.log('PASS');
  }
  if (res) testSum2 += res;
}
console.log(testSum2);



// main
const file = fs.readFileSync('./day2.txt', 'utf-8');
const inputs = file.split('\r\n');

let sum = 0;
let sum2 = 0;
let index = 0;
for (const input of inputs) {
  index++;
  if (isPossible(input)) {
    sum += index;
  }
  sum2 += fewestCubes(input);
}
console.log(sum);
console.log(sum2);

