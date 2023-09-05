import { readInputForChallenge } from '../helpers.js';

declare type StackArray = Array<Array<string>>;

enum Mode {
  PARSE,
  MANIPULATE,
}

class Move {
  constructor(count: number, from: number, to: number) {
    this.count = count;
    this.from = from;
    this.to = to;
  }

  count: number;
  from: number;
  to: number;
}

function parseInput(stacks: StackArray, moves: Array<Move>) {
  const lines = readInputForChallenge('05');
  let mode = Mode.PARSE;

  for (let line of lines) {
    // check for empty line, signals end of parsing, start of manipulating
    if (line === '') {
      mode = Mode.MANIPULATE;
      continue;
    }

    // read initial state of stacks
    if (mode === Mode.PARSE) {
      //if the line has a 1, skip it, it's the label line and we don't care
      if (line[1] === '1') {
        continue;
      }

      // get each 4 character substring of line to parse
      for (let stackIndex = 0; stackIndex < 9; stackIndex++) {
        // get contents of crate from substring
        const sub = line.substring(stackIndex * 4, (stackIndex + 1) * 4);
        const crateContents = sub[1];

        // add contents to bottom of stack if it is not blank
        if (crateContents !== ' ') {
          stacks[stackIndex].unshift(crateContents);
        }
      }
    } else {
      const parts = line.split(' ');
      const count = parseInt(parts[1]);
      const from = parseInt(parts[3]) - 1;
      const to = parseInt(parts[5]) - 1;

      moves.push(new Move(count, from, to));
    }
  }
}

function processMovesSingle(stacks: StackArray, moves: Array<Move>) {
  let move: Move | undefined;
  while ((move = moves.shift())) {
    for (let i = 0; i < move.count; i++) {
      const crate = stacks[move.from].pop();
      if (crate) {
        stacks[move.to].push(crate);
      }
    }
  }
}

function processMovesMultiple(stacks: StackArray, moves: Array<Move>) {
  let move: Move | undefined;
  while ((move = moves.shift())) {
    const splitIndex = stacks[move.from].length - move.count;

    // copy crates off top of from stack
    let crates = stacks[move.from].slice(splitIndex);
    // remove crates from top of from stack
    stacks[move.from] = stacks[move.from].slice(0, splitIndex);
    // add crates to top of to crate
    stacks[move.to].push(...crates);
  }
}

/**
 * Get all the top crates from `stacks`
 * @param stacks
 * @returns String containing the top crate of each stack in `stacks`
 */
function getTopLayer(stacks: StackArray) {
  return stacks.reduce(
    (res, curr) => res + (curr.at(-1) ? curr.at(-1) : ''),
    ''
  );
}

/**
 * Copy a 2D array
 * @param stacks 2D array to copy
 * @returns copied array
 */
function copy2D(stacks: StackArray): StackArray {
  return stacks.map((stack) => [...stack]);
}

function run() {
  //initialize stacks with 9 empty arrays
  let stacks: StackArray = [];
  let stacksMultiple: StackArray;
  let moves: Array<Move> = [];

  for (let i = 0; i < 9; i++) {
    stacks[i] = [];
  }

  //parse input and copy for part 2
  parseInput(stacks, moves);

  // can't do shallow copy for stacks because sub-arrays still have same ref
  stacksMultiple = copy2D(stacks);

  // part 1
  processMovesSingle(stacks, [...moves]); // using spread to create shallow copy
  let topLayer = getTopLayer(stacks);
  console.log(`Part 1: ${topLayer}`);

  // part 2
  processMovesMultiple(stacksMultiple, [...moves]); // using spread to create shallow copy
  topLayer = getTopLayer(stacksMultiple);
  console.log(`Part 2: ${topLayer}`);
}

export { run };
