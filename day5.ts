import * as fs from 'fs';

// functions

function getLocation(seed: number, maps: number[][][]): number {
  let location = seed;
  // console.log(`seed: ${seed}`)
  for (const map of maps) {
    for (const transformation of map) {
      const start = transformation[1];
      const end = transformation[1] + transformation[2] - 1;
      const delta = transformation[0] - transformation [1];
      // only transform if within the range
      if (location >= start && location <= end) {
        location = location + delta;
        break; // don't apply any more transformation for the current map
      }
    }
  }
  // console.log(`seed: ${seed}, location: ${location}`)
  return location;
}

function getLowestLocation(seeds: number[], maps: number[][][], seedRanges?: number[]): number {
  let lowestLocation = Number.MAX_SAFE_INTEGER;
  let s = 0;
  for (const seed of seeds) {
    let range = seedRanges ? seedRanges[s] : 1;
    for (let i = 0; i < range; i++) {
      const location = getLocation(seed + i, maps);
      if (location < lowestLocation) lowestLocation = location;
    }
    s++;
  }
  return lowestLocation;
}

function solve1(input: string): number {
  const split = input.split('\r\n\r\n');
  const seeds = split[0].split(': ')[1].split(' ').map((e) => parseInt(e));
  const mapsString = split.slice(1).map((e) => (e.split('\r\n').slice(1)));
  const maps = mapsString.map((e) => e.map((i) => i.split(' ').map((j) => parseInt(j))));

  return getLowestLocation(seeds, maps);
}

function solve2(input: string): number {
  const split = input.split('\r\n\r\n');
  const seeds = [];
  const seedRanges = [];
  const seedPairs = split[0].split(': ')[1].split(' ').map((e) => parseInt(e));
  for (let index = 0; index < seedPairs.length / 2; index++) {
    seeds.push(seedPairs[index*2]);
    seedRanges.push(seedPairs[index*2+1]);
  }
  const mapsString = split.slice(1).map((e) => (e.split('\r\n').slice(1)));
  const maps = mapsString.map((e) => e.map((i) => i.split(' ').map((j) => parseInt(j))));

  return getLowestLocation(seeds, maps, seedRanges);
}

// tests
const tfile = fs.readFileSync('./day5.test.txt', 'utf-8');

console.log(`Test 1 solution: ${solve1(tfile)}`);
console.log(`Test 2 solution: ${solve2(tfile)}`);

// main
const file = fs.readFileSync('./day5.txt', 'utf-8');

console.log(`Part 1 solution: ${solve1(file)}`);
console.log(`Part 2 solution: ${solve2(file)}`);
