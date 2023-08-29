import { readFileSync } from 'fs';
import { EOL } from 'os';
import { path } from 'path';

/**
 * Read entire file contents as string
 * @param {string} path
 * @returns {string} file contents
 */
function readFileAsString(path) {
  return readFileSync(path).toString();
}

/**
 * Read file contents as an array of strings,
 * each containing a single line
 * @param {string} path
 * @returns {string[]} file contents
 */
function readFileAsLines(path) {
  return readFileAsString(path).split(EOL);
}

function readInputForChallenge(challenge) {
  return readFileAsLines(path.resolve(`src/${challenge}/input.txt`));
}

export { readFileAsLines, readFileAsString, readInputForChallenge };
