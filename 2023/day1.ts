import * as fs from 'fs';

function isDigit(ch: string): boolean {
  return (ch >= '0' && ch <= '9');
}

/**
 * calculates the calibration value of a string, based on the digits in the string
 * @param str input string
 * @returns number representing the calibration value
 */
function getCalibrationValue(str: string): number {
  const nums: number[] = [];
  for (const ch of str) {
    if (isDigit(ch)) {
      nums.push(parseInt(ch));
    }
  }
  return nums[0] * 10 + nums[nums.length-1];
}

/**
 * transforms the worded digits (i.e. 'one') in the string into ones that contain the digit itself
 * replaces instaces of 'one` with 'one1one'. instead of just replacing the word, we preserve the word
 * on both ends due to cases of overlapping letters.
 * e.g. 'oneight' becomes '1ight' if we don't preserve the word
 * @param str input string
 * @returns string that contains all digits needed for calibration value calculation
 */
function changeWordsToNumbers(str: string): string {
  let out = str;
  const wordToNum = [
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
  ];
  for (const transformation of wordToNum) {
    out = out.replaceAll(transformation[0], transformation[0] + transformation[1] + transformation[0]);
  }
  return out;
}

// tests
const getCalibrationValueTestCases = [
  { in: '1abc2', out: 12 },
  { in: 'pqr3stu8vwx', out: 38},
  { in: 'a1b2c3d4e5f', out: 15},
  { in: 'treb7uchet', out: 77}
];

console.log('getCalibrationValueTestCases');
for (const test of getCalibrationValueTestCases) {
  const res = getCalibrationValue(test.in);
  if (res != test.out) {
    console.log(`FAIL: expected ${test.out} but got ${res}`);
  } else {
    console.log('PASS');
  }
}

const part2TestCases = [
  { in: 'two1nine', out: 29 },
  { in: 'eightwothree', out: 83 },
  { in: 'abcone2threexyz', out: 13 },
  { in: 'xtwone3four', out: 24 },
  { in: '4nineeightseven2', out: 42 },
  { in: 'zoneight234', out: 14 },
  { in: '7pqrstsixteen', out: 76 },
  { in: 'threeight', out: 38 },
  { in: 'nine6lqhnvbpxoneseveneightsxjfkz4vr', out: 94},
  { in: '41fournineeightvxxjdthreeeight', out: 48},
];

console.log('part2TestCases');
for (const test of part2TestCases) {
  const nums = changeWordsToNumbers(test.in);
  const res = getCalibrationValue(nums);
  if (res != test.out) {
    console.log(`FAIL: expected ${test.out} but got ${res} (nums: ${nums})`);
  } else {
    console.log('PASS');
  }
}


// main
const file = fs.readFileSync('./day1.txt', 'utf-8');
const inputs = file.split('\r\n');

let sum = 0;

for (const input of inputs) {
  sum += getCalibrationValue(changeWordsToNumbers(input));
}
console.log(sum);
