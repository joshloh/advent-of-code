import * as fs from 'fs';

type Day7Input = {
  cards: string;
  bid: number;
  handType: HandType
}

enum HandType {
  Unknown = -1,
  HighCard = 0,
  OnePair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  FullHouse = 4,
  FourOfAKind = 5,
  FiveOfAKind = 6,
}

const ORDER = 'AKQJT98765432';

// functions
function parse(file: string): Day7Input[] {
  const input = [];
  const lines = file.split('\r\n');
  for (const line of lines) {
    const [cards, bid] = line.split(' ');
    input.push({cards, bid: parseInt(bid), handType: HandType.Unknown});
  }
  return input;
}

function getHandType(hand: Day7Input): HandType {
  const cardMap: Map<string, number> = new Map();
  for (const card of hand.cards) {
    cardMap.set(card, (cardMap.get(card) ?? 0) + 1);
  }
  const size = cardMap.size;
  if (size === 1) { // definitely five of a kind [5]
    return HandType.FiveOfAKind;
  }
  if (size === 2) { // either four of a kind or full house [4,1], [3,2]
    for (const kv of cardMap) {
      if (kv[1] === 4) return HandType.FourOfAKind;
      if (kv[1] === 3) return HandType.FullHouse;
    }
  }
  if (size === 3) { // either three of a kind or two pair [3,1,1], [2,2,1]
    for (const kv of cardMap) {
      if (kv[1] === 3) return HandType.ThreeOfAKind;
      if (kv[1] === 2) return HandType.TwoPair;
    }
  }
  if (size === 4) { // definitely one pair [2,1,1,1]
    return HandType.OnePair;
  }
  // high card [1,1,1,1,1]
  return HandType.HighCard;
}

function sortHands(input: Day7Input[]): Day7Input[] {
  for (const hand of input) {
    hand.handType = getHandType(hand);
  }
  const sorted = input.sort((a, b) => {
    const delta = a.handType - b.handType;
    if (delta !== 0) return delta;
    // tiebreak
    for (let i = 0; i < a.cards.length; i++) {
      const delta2 = ORDER.indexOf(b.cards[i]) -  ORDER.indexOf(a.cards[i]);
      if (delta2 !== 0) return delta2;
    }
    return 0;
  });
  console.dir(sorted, {'maxArrayLength': null});
  // console.log(sorted);
  return sorted;
}

function getWinnings(sorted: Day7Input[]): number {
  let winSum = 0;
  let rank = 1;
  for (const hand of sorted) {
    winSum += (hand.bid * rank);
    rank++;
  }
  return winSum;
}

function solve1(file: string): number {
  const input = parse(file);
  const sorted = sortHands(input);
  return getWinnings(sorted);
}

// tests
const tfile = fs.readFileSync('./day7.test.txt', 'utf-8');
console.log(`Test 1 solution: ${solve1(tfile)}`);
// console.log(`Test 2 solution: ${solve2(tfile)}`);

// main
const file = fs.readFileSync('./day7.txt', 'utf-8');
console.log(`Part 1 solution: ${solve1(file)}`);
// console.log(`Part 2 solution : ${solve2(file)}`);
