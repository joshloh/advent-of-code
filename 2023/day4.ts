import * as fs from 'fs';

// functions
function calculateWinnings(n: number): number {
  if (n == 0) return 0;
  return 2**(n-1);
}

function calculateMatches(str: string): number {
  let matches = 0;
  const winningNumbers = str.split(': ')[1].split('| ')[0].split(' ').filter((e) => e != '');
  const numbersYouHave = str.split(': ')[1].split('| ')[1].split(' ').filter((e) => e != '');
  for (const winningNumber of winningNumbers) {
    for (const numberYouHave of numbersYouHave) {
      if (winningNumber == numberYouHave) matches++;
    }
  }
  return matches;
}

function countCards(lines: string[]): number {
  let total = 0;
  const cardCopies = new Array(lines.length).fill(1);
  let currentCard = 0;
  for (const line of lines) {
    const win = calculateMatches(line);
    for (let i = 0; i < win; i++) {
      if (i > cardCopies.length - 1) continue;
      cardCopies[currentCard + 1 + i] += cardCopies[currentCard];
    }
    currentCard++;
  }
  for (const cards of cardCopies) {
    total += cards;
  }
  return total;
}

// tests
const tfile = fs.readFileSync('./day4.test.txt', 'utf-8');
const tlines = tfile.split('\r\n');

let tsum = 0;
for (const line of tlines) {
  tsum += calculateWinnings(calculateMatches(line));
}

console.log(`TEST: part 1: ${tsum}`);
console.log(`TEST: part 2: ${countCards(tlines)}`);

// main
const file = fs.readFileSync('./day4.txt', 'utf-8');
const lines = file.split('\r\n');

let sum = 0;
for (const line of lines) {
  sum += calculateWinnings(calculateMatches(line));
}

console.log(`Part 1 solution: ${sum}`);
console.log(`Part 2 solution: ${countCards(lines)}`);
