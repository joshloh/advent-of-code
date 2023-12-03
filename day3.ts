import * as fs from 'fs';

function isDigit(ch: string): boolean {
  return (ch >= '0' && ch <= '9');
}

function isSymbol(ch: string): boolean {
  let strRegex = new RegExp(/^[a-z0-9]+$/i);
  if (ch == '.') return false;
  return !strRegex.test(ch);
}

function hasSurroundingSymbol(
    schematic: string[][],
    rowIndex: number,
    colIndex: number,
    length: number,
  ): boolean {
  let res = false;
  for (let checkingRow = rowIndex - 1; checkingRow < rowIndex + 2; checkingRow++) {
    for (let checkingCol = colIndex - 1; checkingCol < colIndex + length + 1; checkingCol++) {
      // OOB check
      if (checkingRow < 0 || checkingCol < 0 || checkingRow > schematic.length - 1 || checkingCol > schematic[0].length - 1) {
        continue;
      }
      const ch = schematic[checkingRow][checkingCol];
      // console.log(`checking for symbol: ${ch}`)
      if (isSymbol(ch)) {
        // console.log('yep');
        res = true;
      }
    }
  }
  return res;
}

type GearPos = {
  row: number,
  col: number,
}

function hasSurroundingGear(
  schematic: string[][],
  schematicNumber: SchematicNumber,
): {
    hasGear: boolean
    gearPos: GearPos[]
  } {
  let res = false;
  let pos = []
  for (let checkingRow = schematicNumber.startCoord.row - 1; checkingRow < schematicNumber.startCoord.row + 2; checkingRow++) {
    for (let checkingCol = schematicNumber.startCoord.col - 1; checkingCol < schematicNumber.startCoord.col + schematicNumber.len + 1; checkingCol++) {
      // OOB check
      if (checkingRow < 0 || checkingCol < 0 || checkingRow > schematic.length - 1 || checkingCol > schematic[0].length - 1) {
        continue;
      }
      const ch = schematic[checkingRow][checkingCol];
      if (ch == '*') {
        res = true;
        pos.push({row: checkingRow, col: checkingCol})
      }
    }
  }
  return {hasGear: res, gearPos: pos};
}

function processSchematic(schematic: string[][]): number {
  let res = 0;
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
          // check for surrounding symbol, and all to total if there is one
          // console.log(`process number: ${numberBuffer}`)
          if(hasSurroundingSymbol(schematic, rowIndex, numberStartIndex, numberBuffer.length)) {
            // console.log(`found number with surrounding symbols: ${numberBuffer}`)
            res += parseInt(numberBuffer);
          }
          // reset the buffers
          processingNumber = false;
          numberBuffer = '';
        }
      }
    }
    // if buffer is not empty, then we still have an unprocessed number
    if (numberBuffer != '') {
      // console.log(`process number: ${numberBuffer}`)
      if(hasSurroundingSymbol(schematic, rowIndex, numberStartIndex, numberBuffer.length)) {
        // console.log(`found number with surrounding symbols: ${numberBuffer}`)
        res += parseInt(numberBuffer);
      }
    }
  }
  return res;
}

type SchematicNumber = {
  num: number;
  len: number;
  startCoord: {
    row: number;
    col: number;
  }
}

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
            startCoord: {
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
    // if buffer is not empty, then we still have an unprocessed number
    if (numberBuffer != '') {
      res.push({
        num: parseInt(numberBuffer),
        len: numberBuffer.length,
        startCoord: {
          row: rowIndex,
          col: numberStartIndex
        }
      });
    }
  }
  return res;
}

type NumsAndGears = {
  num: number;
  gears: GearPos[];
}

function hasCommonGear(a: GearPos[], b: GearPos[]) {
  for (const i of a) {
    for (const j of b) {
      if (i.col == j.col && i.row == j.row) {
        return true;
      }
    }
  }
  return false;
}

function getGearRatio(schematic: string[][], schematicNumbers: SchematicNumber[]): number {
  let ratio = 0;
  const numsAndGears: NumsAndGears[] = [];
  for (const schematicNumber of schematicNumbers) {
    const gearRes = hasSurroundingGear(schematic, schematicNumber);

    if (gearRes.hasGear) {
      numsAndGears.push({num: schematicNumber.num, gears: gearRes.gearPos})
    }
  }
  // iterate through all the numbers that have gears and see if there are any that have the same gear
  for (let i = 0; i < numsAndGears.length - 1; i++) {
    const element = numsAndGears[i];
    let common = [];
    for (let j = i + 1; j < numsAndGears.length; j++) {
      const compareTo = numsAndGears[j];
      if (hasCommonGear(element.gears, compareTo.gears)) {
        common.push(compareTo);
      }
    }
    if (common.length == 1) {
      console.log(`found gear: ${element.num} and ${common[0].num}`)
      ratio += element.num * common[0].num;
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

const res = processSchematic(testSchematic);
console.log(res);

const testSchematicNumbers = findNumbers(testSchematic);
console.log(getGearRatio(testSchematic, testSchematicNumbers))

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

console.log(processSchematic(schematic));

const schematicNumbers = findNumbers(schematic);
console.log(getGearRatio(schematic, schematicNumbers))

// 308710 too low