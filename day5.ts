import * as fs from 'fs';

// functions

// parse input and return a seeds array and a maps array which contains all maps/transformations
function parseInput(input: string): {
  seeds: number[],
  maps: number[][][]
} {
  const split = input.split('\r\n\r\n');
  const seeds = split[0].split(': ')[1].split(' ').map((e) => parseInt(e));
  const mapsString = split.slice(1).map((e) => (e.split('\r\n').slice(1)));
  const maps = mapsString.map((e) => e.map((i) => i.split(' ').map((j) => parseInt(j))));
  return {
    seeds,
    maps
  }
}

// traverse a "seed" through a map of transformations and return the final transformed vaLue
function getLocation(seed: number, maps: number[][][]): number {
  let location = seed;
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
  return location;
}

// calculate all locations for each seed and return the lowest one
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

// solve part 1
function solve1(input: string): number {
  const { seeds, maps } = parseInput(input);
  return getLowestLocation(seeds, maps);
}

// solve part 2
function solve2(input: string): number {
  const { seeds: seedPairs , maps } = parseInput(input);
  const seeds = [];
  const seedRanges = [];
  for (let index = 0; index < seedPairs.length / 2; index++) {
    seeds.push(seedPairs[index*2]);
    seedRanges.push(seedPairs[index*2+1]);
  }
  return getLowestLocation(seeds, maps, seedRanges);
}

// Part 2 optimised by searching backwards (starting from a low number, search potential locations and go backwards finding the original seed, see if within seed ranges)
function findOriginalSeed(seeds: number[], backwardsMap: number[][][], seedRanges: number[]): number {
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    const orignalSeed = getLocation(i, backwardsMap);
    let s = 0;
    for (const seed of seeds) {
      if (orignalSeed >= seed && orignalSeed <= seed + seedRanges[s]) return i;
      s++
    }
  }
  return -1;
}

// solve part 2 by searching backwards
function solve2Optimised(input: string): number {
  const { seeds: seedPairs , maps } = parseInput(input);
  const seeds = [];
  const seedRanges = [];
  for (let index = 0; index < seedPairs.length / 2; index++) {
    seeds.push(seedPairs[index*2]);
    seedRanges.push(seedPairs[index*2+1]);
  }
  const backwardsMap = maps.map((e) => e.map((i) => [i[1], i[0], i[2]])).reverse();
  return findOriginalSeed(seeds, backwardsMap, seedRanges);
}

// tests
const tfile = fs.readFileSync('./day5.test.txt', 'utf-8');

console.log(`Test 1 solution: ${solve1(tfile)}`);
console.log(`Test 2 solution: ${solve2(tfile)}`);
console.log(`Test OPTIMISED solution: ${solve2Optimised(tfile)}`);

// main
const file = fs.readFileSync('./day5.txt', 'utf-8');

console.log(`Part 1 solution: ${solve1(file)}`);
// console.log(`Part 2 solution : ${solve2(file)}`);
console.log(`Part 2 OPTIMISED solution : ${solve2Optimised(file)}`);
