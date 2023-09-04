import { readInputForChallenge } from '../helpers.js';

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

function parseInput(stacks: Array<Array<string>>, moves: Array<Move>) {
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

function processMoves(stacks: Array<Array<string>>, moves: Array<Move>) {
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

function run() {
  //initialize stacks with 9 empty arrays
  let stacks: Array<Array<string>> = [];
  let moves: Array<Move> = [];

  for (let i = 0; i < 9; i++) {
    stacks[i] = [];
  }

  parseInput(stacks, moves);

  processMoves(stacks, moves);

  // print answer to part one, which crate is at the top of each stack
  const topLayer = stacks.reduce(
    (res, curr) => res + (curr.at(-1) ? curr.at(-1) : ''),
    ''
  );

  console.log(topLayer);

  // console.log(stacks);
}

export { run };
