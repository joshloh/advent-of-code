import * as fs from 'fs';

type Day11Input = string[][];

type Coord = {
  row: number;
  col: number;
}

function parse(file: string): Day11Input {
  const out = [];
  const lines = file.split('\n');
  for (const line of lines) {
    const chars = [];
    for (const ch of line) {
      chars.push(ch);
    }
    out.push(chars);
  }
  return out;
}


function getGalaxies(input: Day11Input):
  Coord[] {
  const galaxies = [];
  // find all galaxies 
  for (let r = 0; r < input.length; r++) {
    const row = input[r];
    for (let c = 0; c < input.length; c++) {
      const e = row[c];
      if (e === '#') {
        galaxies.push({ row: r, col: c });
      }
    }
  }
  return galaxies;
}

function getEmptyLines(galaxies: Coord[], rowLength: number, colLength: number): {
  rows: number[], cols: number[]
} {
  const rows = [];
  const cols = [];
  for (let row = 0; row < rowLength; row++) {
    let hasGalaxy = false;
    for (const galaxy of galaxies) {
      if (row === galaxy.row) hasGalaxy = true;
    }
    if (!hasGalaxy) rows.push(row);
  }
  for (let col = 0; col < colLength; col++) {
    let hasGalaxy = false;
    for (const galaxy of galaxies) {
      if (col === galaxy.col) hasGalaxy = true;
    }
    if (!hasGalaxy) cols.push(col);
  }

  return {
    rows, cols
  };
}

function isBetween(input: number, n1: number, n2: number): boolean {
  const [max, min] = (n1 > n2) ? [n1, n2] : [n2, n1];
  return (input > min && input < max);
}

function getDistance(g1: Coord, g2: Coord, emptyRows: number[], emptyCols: number[], expandFactor: number): number {
  let emptyRowsBetween = 0;
  let emptyColsBetween = 0;
  for (const row of emptyRows) {
    if (isBetween(row, g1.row, g2.row)) emptyRowsBetween++;
  }
  for (const col of emptyCols) {
    if (isBetween(col, g1.col, g2.col)) emptyColsBetween++;
  }
  return ((g1.row > g2.row) ? g1.row - g2.row : g2.row - g1.row) + ((g1.col > g2.col) ? g1.col - g2.col : g2.col - g1.col) + (emptyRowsBetween + emptyColsBetween) * (expandFactor - 1);
}

function solve1(file: string, expandFactor: number): number {
  let res = 0;
  const input = parse(file);
  // console.log(input);
  const galaxies = getGalaxies(input);
  const { rows, cols } = getEmptyLines(galaxies, input[0].length, input.length);
  // console.log(galaxies);
  // console.log(`empty rows: ${rows}, empty cols: ${cols}`);
  for (let g = 0; g < galaxies.length - 1; g++) {
    const galaxy = galaxies[g];
    for (let g2 = g + 1; g2 < galaxies.length; g2++) {
      const galaxy2 = galaxies[g2];
      const dist = getDistance(galaxy, galaxy2, rows, cols, expandFactor);
      // console.log(`Distance between [${galaxies[g].row}, ${galaxies[g].col}] and [${galaxies[g2].row}, ${galaxies[g2].col}] is ${dist}`);
      res += dist;
    }
  }
  return res;
}

// tests
const tfile = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

console.log(`Test 1 solution: ${solve1(tfile, 2)}`);
console.log(`Test 2 solution: ${solve1(tfile, 100)}`);

// main
const file = fs.readFileSync('./day11.txt', 'utf-8');
console.log(`Part 1 solution: ${solve1(file, 2)}`);
console.log(`Part 2 solution : ${solve1(file, 1_000_000)}`);