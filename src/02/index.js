import { readInputForChallenge } from '../helpers.js';

class Choice {
  /**
   * Create a new `Choice` object from a string
   * @param {'A' | 'B' | 'C' | 'X' | 'Y' | 'Z'} s choice string
   */
  constructor(s) {
    if (s === 'A' || s === 'X') {
      this.choice = 'rock';
    } else if (s === 'B' || s === 'Y') {
      this.choice = 'paper';
    } else if (s === 'C' || s === 'Z') {
      this.choice = 'scissors';
    } else {
      throw new Error('invalid choice string: ' + s);
    }
  }

  /**
   * Returns a string that tells the result of a match against the `other` choice
   * @param {Choice} other The other Choice to determine the result against
   * @returns {'win'|'lose'|'draw'}
   */
  result = function (other) {
    if (this.choice === other.choice) {
      return 'draw';
    } else {
      switch (this.choice) {
        case 'rock':
          if (other.choice === 'scissors') {
            return 'win';
          } else {
            return 'lose';
          }
        case 'paper':
          if (other.choice === 'rock') {
            return 'win';
          } else {
            return 'lose';
          }
        case 'scissors':
          if (other.choice === 'paper') {
            return 'win';
          } else {
            return 'lose';
          }
        default:
          // should never happen unless self.choice is modified from outside this object
          throw new Error('self.choice is invalid: ' + self.choice);
      }
    }
  };
}

/**
 * Determine what choice you should make to have the desired outcome
 * against a given choice
 * @param {Choice} other The opponents choice
 * @param {'win'|'lose'|'draw'} desiredResult The desired result
 * @returns {Choice} the choice you should play to get desired result against `other`
 */
function getNeededChoiceForDesiredResult(other, desiredResult) {
  const possibleChoices = [new Choice('A'), new Choice('B'), new Choice('C')];
  const neededChoice = possibleChoices.filter((possibleChoice) => {
    return possibleChoice.result(other) === desiredResult;
  })[0];

  // console.log(
  //   `to ${desiredResult} against ${other.choice}, play ${neededChoice.choice}`
  // );
  return neededChoice;
}

const RESULT_VALUE = {
  win: 6,
  draw: 3,
  lose: 0,
};

const CHOICE_VALUE = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const DESIRED_RESULTS = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

function run() {
  const lines = readInputForChallenge('02');

  let roundCount = 0;
  let idealScore = 0;
  let actualScore = 0;

  for (let line of lines) {
    roundCount++;
    let roundScore = 0;

    // create choice objects
    const choiceStrings = line.split(' ');
    const opponentsChoice = new Choice(choiceStrings[0]);
    const myChoice = new Choice(choiceStrings[1]);

    //
    const desiredResult = DESIRED_RESULTS[choiceStrings[1]];
    const actualChoice = getNeededChoiceForDesiredResult(
      opponentsChoice,
      desiredResult
    );

    // determine ideal results
    const idealResult = myChoice.result(opponentsChoice);
    idealScore += RESULT_VALUE[idealResult];
    roundScore += RESULT_VALUE[idealResult];

    idealScore += CHOICE_VALUE[myChoice.choice];
    roundScore += CHOICE_VALUE[myChoice.choice];

    // determine actual results
    const actualResult = actualChoice.result(opponentsChoice);
    actualScore += RESULT_VALUE[actualResult];
    actualScore += CHOICE_VALUE[actualChoice.choice];

    // console.log(
    //   `round ${roundCount}: ${mine.choice} vs ${opponents.choice} = ${result} | roundScore = ${roundScore}, totalScore = ${score}`
    // );

    // if (roundCount > 20) break;
  }

  console.log(`Ideal score (problem 1): ${idealScore}`);
  console.log(`Actual score (problem 2): ${actualScore}`);
}

export { run };
