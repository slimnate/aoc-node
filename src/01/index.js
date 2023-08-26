/**
 * https://adventofcode.com/2022/day/1/answer
 */
import path from 'path';
import { readFileAsLines } from '../helpers.js';

function run() {
  // read data
  const inputPath = path.resolve('src/01/input.txt');
  const lines = readFileAsLines(inputPath);

  let elfCalorieCounts = [0];
  let currentElfIndex = 0;

  for (const line of lines) {
    if (line === '') {
      currentElfIndex++;
      elfCalorieCounts[currentElfIndex] = 0;
    } else {
      elfCalorieCounts[currentElfIndex] += parseInt(line);
    }
  }

  // part one
  const maxElfCalorieCount = Math.max(...elfCalorieCounts);
  const elfWithMaxCalories = elfCalorieCounts.indexOf(maxElfCalorieCount);

  console.log(
    `Elf number ${elfWithMaxCalories} has the most calories, with ${maxElfCalorieCount}`
  );

  // part two
  elfCalorieCounts.sort((a, b) => b - a);

  const topThreeElfCalorieCounts = elfCalorieCounts.slice(0, 3);
  const topThreeElfTotalCalories = topThreeElfCalorieCounts.reduce(
    (prev, curr) => prev + curr
  );
  console.log(topThreeElfCalorieCounts);
  console.log(topThreeElfTotalCalories);
}

export { run };
