import path from 'path';
import { readFileAsLines } from '../helpers.js';

function getPriority(item) {
  const charCode = item.charCodeAt(0);
  if (charCode > 96) {
    // lowercase
    return charCode - 96;
  } else {
    // uppercase
    return charCode - 64 + 26;
  }
}

function run() {
  const inputPath = path.resolve('src/03/input.txt');
  const lines = readFileAsLines(inputPath);

  let totalPriority = 0;

  for (const line of lines) {
    // split into packs
    let sackSize = line.length;
    let packSize = sackSize / 2;
    let pack1 = line.substring(0, packSize);
    let pack2 = line.substring(packSize);
    let matchingItem;

    // find matching item
    for (let i = 0; i < packSize; i++) {
      const item1 = pack1[i];
      for (let j = 0; j < packSize; j++) {
        const item2 = pack2[j];
        if (item1 === item2) {
          matchingItem = item1;
          break; // break from inner loop when found match
        }
      }
      // break from outer loop if match was found
      if (matchingItem) break;
    }

    // get value of item
    totalPriority += getPriority(matchingItem);

    // console.log(pack1);
    // console.log(pack2);
    // console.log(matchingItem);
    // console.log(totalPriority);
  }

  console.log(totalPriority);
}

export { run };
