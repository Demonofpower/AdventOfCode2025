import {readFileSync} from 'fs';

let absolute: number = 0;

const content: string = readFileSync('input.txt', 'utf-8');
const grid: string[][] = content
    .trim()
    .split('\n')
    .map((line: string): string[] => line.split(/\s+/));

for (let col = 0; col < grid[0].length; col++) {
    let total: number = 0;

    const numbers: number[] = grid.slice(0, -1).map((row: string[]): number => Number(row[col]));
    const operation: string = grid[grid.length - 1][col];

    for (const num of numbers) {
        if (operation === '+') {
            total += num;
        } else {
            if (total === 0) {
                total = num;
            } else {
                total *= num;
            }
        }
    }

    absolute += total;
}

console.log(absolute);