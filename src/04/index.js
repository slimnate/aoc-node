import path from 'path';
import { readFileAsLines } from '../helpers.js';

class NumRange {
  /**
   * Represents a range of numbers, inclusive
   * @param {Number} start the starting number of the range
   * @param {Number} end the ending number of the range
   */
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  /**
   * Test if this range fully contains `other` range.
   * @param {NumRange} other the range to compare against
   * @returns `true` if this range fully contains the `other` range
   */
  contains = function (other) {
    return this.start <= other.start && this.end >= other.end;
  };
}

/**
 * Parse a string in the format #-#,#-# (where # represents any number of digits)
 * into two `NumRange` objects.
 * @param {String} str string containing two ranges to parse
 * @returns {[NumRange, NumRange]} a tuple containing each of the ranges
 */
function parseRangeString(str) {
  const numStrings = str.split('-');
  const start = parseInt(numStrings[0]);
  const end = parseInt(numStrings[1]);
  return new NumRange(start, end);
}

/**
 * Parse all of the initial input data for this problem
 * @returns {[[NumRange, NumRange]]} array of tuples containing pairs of ranges
 */
function parseInput() {
  const lines = readFileAsLines(path.resolve('src/04/input.txt'));
  let pairs = [];
  for (let line of lines) {
    const ranges = line.split(',');
    const range1 = parseRangeString(ranges[0]);
    const range2 = parseRangeString(ranges[1]);

    // console.log(range1);
    // console.log(range2);
    pairs.push([range1, range2]);
  }

  return pairs;
}

/**
 * Main run function
 */
function run() {
  const pairs = parseInput();

  // part 1, get number of pairs which one fully contains the other
  let fullyContainedCount = 0;
  for (let pair of pairs) {
    const [first, second] = pair;

    if (first.contains(second) || second.contains(first)) {
      fullyContainedCount++;
    }
  }

  console.log(`fullyContainedCount: ${fullyContainedCount}`);
}

export { run };
