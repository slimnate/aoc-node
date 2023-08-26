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

/**
 * Get a string containing all the shared characters (items) among a set of strings (packs)
 * @param {string[]} packs Return the shared items among all of the provided packs
 * @returns {string} string with all the items shared in each pack. Empty string if none shared
 */
function getSharedItem(packs) {
  // if only one pack provided, return it, or we will get errors when trying to compare with pack 2.
  if (packs.length < 2) {
    return packs[0];
  }

  // get first two packs from the list
  let pack1 = packs.shift();
  let pack2 = packs.shift();

  // find shared items among these two packs
  let sharedItems = '';
  for (let i = 0; i < pack1.length; i++) {
    for (let j = 0; j < pack2.length; j++) {
      if (pack1[i] === pack2[j]) {
        if (sharedItems.indexOf(pack1[i]) < 0) {
          sharedItems += pack1[i];
        }
      }
    }
  }

  // add shared items to beginning of the list of packs
  if (packs.unshift(sharedItems) === 1) {
    // if the shared list is the only pack remaining, return it.
    return sharedItems;
  } else {
    // if there are still multiple packs remaining, recursively call this method until all packs have been searched.
    return getSharedItem(packs);
  }
}

function run() {
  const inputPath = path.resolve('src/03/input.txt');
  const lines = readFileAsLines(inputPath);

  let totalPriority = 0;

  // part 1
  for (const line of lines) {
    // split into packs
    let sackSize = line.length;
    let packSize = sackSize / 2;
    let pack1 = line.substring(0, packSize);
    let pack2 = line.substring(packSize);

    // find matching item
    const matchingItem = getSharedItem([pack1, pack2]);

    // get value of item
    totalPriority += getPriority(matchingItem);

    // console.log(pack1);
    // console.log(pack2);
    // console.log(matchingItem);
    // console.log(totalPriority);
  }

  console.log(totalPriority);

  let groupPriority = 0;
  // part 2
  for (let i = 0; i < lines.length; i = i + 3) {
    const groupLines = lines.slice(i, i + 3);

    const sharedItem = getSharedItem(groupLines);
    // console.log(sharedItem);

    groupPriority += getPriority(sharedItem);
  }
  console.log(groupPriority);
}

export { run };
