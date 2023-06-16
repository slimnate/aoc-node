/**
 * https://adventofcode.com/2022/day/1/answer
 */
import { readFileSync } from 'fs';
import { EOL } from 'os';
import path from 'path';

function run() {
  const inputPath = path.resolve('src/01/input.txt');
  const input = readFileSync(inputPath).toString();
  const lines = input.split(EOL);

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

  const maxElfCalorieCount = Math.max(...elfCalorieCounts);

  const elfWithMaxCalories = elfCalorieCounts.indexOf(maxElfCalorieCount);

  console.log(
    `Elf number ${elfWithMaxCalories} has the most calories, with ${maxElfCalorieCount}`
  );
}

export { run };
