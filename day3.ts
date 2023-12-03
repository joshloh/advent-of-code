import * as fs from 'fs';

// types
type Coord = {
  row: number;
  col: number;
}

type SchematicNumber = {
  num: number;
  len: number;
  start: Coord;
}

type NumsAndGears = {
  num: number;
  gears: Coord[];
}

// functions
function isDigit(ch: string): boolean {
  return (ch >= '0' && ch <= '9');
}

function isSymbol(ch: string): boolean {
  let strRegex = new RegExp(/^[a-z0-9]+$/i);
  if (ch == '.') return false;
  return !strRegex.test(ch);
}

/**
 * checks if a @type SchematicNumber is surrounded by any "thing"
 * @param schematic the schematic map
 * @param schematicNumber represents a number on the schematic map
 * @param isThingToFind function for identifying the "thing" to look for
 * @returns hasThing: whether or not the thing was found
 * @returns thingPositions: array of coordinates corresponding to found things
 */
function hasSurroundingThing(
    schematic: string[][],
    schematicNumber: SchematicNumber,
    isThingToFind: (ch: string) => boolean, 
  ): {
    hasThing: boolean,
    thingPositions: Coord[]
  } {
  let hasThing = false;
  let thingPositions = [];
  const [ row, col ] = [ schematicNumber.start.row, schematicNumber.start.col ];
  for (let checkingRow = row - 1; checkingRow < row + 2; checkingRow++) {
    for (let checkingCol = col - 1; checkingCol < col + schematicNumber.len + 1; checkingCol++) {
      // OOB check
      if (checkingRow < 0 || checkingCol < 0 || checkingRow > schematic.length - 1 || checkingCol > schematic[0].length - 1) {
        continue;
      }
      const ch = schematic[checkingRow][checkingCol];
      if (isThingToFind(ch)) {
        hasThing = true;
        thingPositions.push({row: checkingRow, col: checkingCol})
      }
    }
  }
  return {
    hasThing,
    thingPositions
  };
}

/**
 * sums up all the part numbers by passing in schematic numbers and a schematic map
 * searches the surrounds of the schematic numbers in the map and adds to sum if surrounded by a symbol
 * @param schematic 
 * @param schematicNumbers 
 * @returns 
 */
function getSumOfPartNumbers(schematic: string[][], schematicNumbers: SchematicNumber[]): number {
  let res = 0;
  for (const schematicNumber of schematicNumbers) {
    if(hasSurroundingThing(schematic, schematicNumber, isSymbol).hasThing) {
      res += schematicNumber.num;
    }
  }
  return res;
}

/**
 * finds and parses all the numbers in a schematic
 * @param schematic 
 * @returns SchematicNumber: a type containing info about the number such as its value, its starting coordinates and its length
 */
function findNumbers(schematic: string[][]): SchematicNumber[] {
  let res: SchematicNumber[] = [];
  for (let rowIndex = 0; rowIndex < schematic.length; rowIndex++) {
    // state management
    let processingNumber = false;
    let numberBuffer = '';
    let numberStartIndex = -1;
    const row = schematic[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const ch = row[colIndex];
      if (isDigit(ch)) {
        // not yet processing a number, start processing a new one
        if (!processingNumber) {
          processingNumber = true;
          numberStartIndex = colIndex;
        }
        // regardless of new number or not, add number to buffer
        numberBuffer += ch;
      }
      // if not a digit and we are processing a number, then the number has finished
      else {
        if (processingNumber) {
          res.push({
            num: parseInt(numberBuffer),
            len: numberBuffer.length,
            start: {
              row: rowIndex,
              col: numberStartIndex
            }
          });
          // reset the buffers
          processingNumber = false;
          numberBuffer = '';
        }
      }
    }
    // if buffer is not empty after the loop ends, then we still have an unprocessed number
    if (numberBuffer != '') {
      res.push({
        num: parseInt(numberBuffer),
        len: numberBuffer.length,
        start: {
          row: rowIndex,
          col: numberStartIndex
        }
      });
    }
  }
  return res;
}

/**
 * @param a list of coordinates
 * @param b list of coordinates to compare to
 * @returns boolean representing if common coordinates were found
 */
function hasCommonCoord(a: Coord[], b: Coord[]) {
  for (const i of a) {
    for (const j of b) {
      if (i.col == j.col && i.row == j.row) {
        return true;
      }
    }
  }
  return false;
}

/**
 * calculates the gear ratio of a schematic map, given a list of schematic numbers
 * iterates through schematic numbers in the list and finds gears (*) associated with the number
 * iterates through all number-gear pairs and adds the product of them to the total gear ratio
 * if there are exactly two numbers associated with one gear
 * @param schematic schematic map to search for gears
 * @param schematicNumbers schematic numbers to iterate through and find associated gears
 * @returns the "gear ratio" of the map
 */
function getGearRatio(schematic: string[][], schematicNumbers: SchematicNumber[]): number {
  let ratio = 0;
  const numsAndGears: NumsAndGears[] = [];
  for (const schematicNumber of schematicNumbers) {
    const gearRes = hasSurroundingThing(schematic, schematicNumber, (ch: string) => (ch == '*')); // inline gear finder function

    if (gearRes.hasThing) {
      numsAndGears.push({num: schematicNumber.num, gears: gearRes.thingPositions})
    }
  }
  // iterate through all the numbers that have gears and see if there are any that have the same gear
  for (let i = 0; i < numsAndGears.length - 1; i++) {
    const numAndGear = numsAndGears[i];
    let common = [];
    for (let j = i + 1; j < numsAndGears.length; j++) {
      const compareTo = numsAndGears[j];
      if (hasCommonCoord(numAndGear.gears, compareTo.gears)) {
        common.push(compareTo);
      }
    }
    if (common.length == 1) {
      ratio += numAndGear.num * common[0].num;
    }
  }
  return ratio;
}

// tests
const testFile = fs.readFileSync('./day3.test.txt', 'utf-8');
const testLines = testFile.split('\r\n');

const testSchematic: string[][] = [];
for (const line of testLines) {
  const newRow: string[] = [];
  for (const ch of line) {
    newRow.push(ch);
  }
  testSchematic.push(newRow);
}

const testSchematicNumbers = findNumbers(testSchematic);
console.log(`TEST: part 1: ${getSumOfPartNumbers(testSchematic, testSchematicNumbers)}`);
console.log(`TEST: part 2: ${getGearRatio(testSchematic, testSchematicNumbers)}`);

// main
const file = fs.readFileSync('./day3.txt', 'utf-8');
const lines = file.split('\r\n');

const schematic: string[][] = [];
for (const line of lines) {
  const newRow: string[] = [];
  for (const ch of line) {
    newRow.push(ch);
  }
  schematic.push(newRow);
}

const schematicNumbers = findNumbers(schematic);
console.log(`Part 1 solution: ${getSumOfPartNumbers(schematic, schematicNumbers)}`);
console.log(`Part 2 solution: ${getGearRatio(schematic, schematicNumbers)}`);
