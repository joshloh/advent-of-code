import * as fs from 'fs';

// functions
function validPermutations(time: number, distance: number): number {
  let count = 0;
  for (let i = 0; i < time; i++) {
    if (i * (time - i) > distance) {
      count++;
    }
  }
  return count;
}

function solve1(input: string): number {
  let ans = 1;
  const split  = input.split('\r\n');
  const times = split[0].split(' ').filter((e) => e != '').slice(1).map((e) => parseInt(e));
  const distances = split[1].split(' ').filter((e) => e != '').slice(1).map((e) => parseInt(e));
  for (let i = 0; i < times.length; i++) {
    ans *= validPermutations(times[i], distances[i]);
  }
  return ans;
}

function solve2(input: string): number {
  const split  = input.split('\r\n');
  const time = parseInt(split[0].split(' ').filter((e) => e != '').slice(1).reduce((acc, curr) => acc + curr, ''));
  const distance = parseInt(split[1].split(' ').filter((e) => e != '').slice(1).reduce((acc, curr) => acc + curr, ''));
  return validPermutations(time, distance);
}

// tests
const tfile = fs.readFileSync('./day6.test.txt', 'utf-8');
console.log(`Test 1 solution: ${solve1(tfile)}`);
console.log(`Test 2 solution: ${solve2(tfile)}`);

// main
const file = fs.readFileSync('./day6.txt', 'utf-8');
console.log(`Part 1 solution: ${solve1(file)}`);
console.log(`Part 2 solution : ${solve2(file)}`);

