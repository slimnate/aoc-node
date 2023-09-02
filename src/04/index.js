import { readInputForChallenge } from '../helpers.js';

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

  /**
   * Test if any part of this range overlaps `other` range.
   * @param {NumRange} other the range to compare against
   * @returns `true` if this range overlaps the other range at all.
   */
  overlaps = function (other) {
    return (
      (this.start <= other.end && this.end >= other.end) ||
      (this.end >= other.start && this.start <= other.end)
    );
  };

  toString = function () {
    return `Range(${this.start}, ${this.end})`;
  };
}

/**
 * Parse a string in the format #-# (where # represents any number of digits)
 * into a `NumRange` object.
 * @param {String} str string containing two ranges to parse
 * @returns {NumRange} a tuple containing each of the ranges
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
  const lines = readInputForChallenge('04');
  let pairs = [];
  for (let line of lines) {
    const ranges = line.split(',');
    const range1 = parseRangeString(ranges[0]);
    const range2 = parseRangeString(ranges[1]);

    pairs.push([range1, range2]);
  }

  return pairs;
}

/**
 * Main run function
 */
function run() {
  const pairs = parseInput();

  let fullyContainedCount = 0;
  let overlapCount = 0;

  for (let pair of pairs) {
    const [first, second] = pair;

    // part 1, get number of pairs which one fully contains the other
    if (first.contains(second) || second.contains(first)) {
      fullyContainedCount++;
    }

    //part 2, get number of pairs which partially overlap
    if (first.overlaps(second)) {
      overlapCount++;
    }
  }

  console.log(`fullyContainedCount: ${fullyContainedCount}`);
  console.log(`overlapCount: ${overlapCount}`);
}

export { run };
