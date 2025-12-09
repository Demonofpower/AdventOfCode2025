import {readFileSync} from 'fs';

const content: string = readFileSync('input.txt', 'utf-8');
const lines: string[] = content.trimEnd().split('\n');

const maxLen: number = Math.max(...lines.map((l: string): number => l.length));
const padded: string[] = lines.map((l: string): string => l.padEnd(maxLen));

let grandTotal: number = 0;
let numbers: number[] = [];
let operation: string = '';

for (let col = maxLen - 1; col >= 0; col--) {
    let digits: string = '';

    for (let row = 0; row < padded.length - 1; row++) {
        const char: string = padded[row][col];
        if (char !== ' ') {
            digits += char;
        }
    }

    const opChar: string = padded[padded.length - 1][col];

    if (opChar === '+' || opChar === '*') {
        operation = opChar;
    }

    if (digits.length > 0) {
        numbers.push(Number(digits));
    } else if (numbers.length > 0) {
        const result: number = operation === '+'
            ? numbers.reduce((a: number, b: number): number => a + b, 0)
            : numbers.reduce((a: number, b: number): number => a * b, 1);
        grandTotal += result;
        numbers = [];
    }
}

if (numbers.length > 0) {
    const result: number = operation === '+'
        ? numbers.reduce((a: number, b: number): number => a + b, 0)
        : numbers.reduce((a: number, b: number): number => a * b, 1);
    grandTotal += result;
}

console.log(grandTotal);