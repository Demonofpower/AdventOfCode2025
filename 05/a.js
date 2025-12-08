const fs = require('fs');
const readline = require('readline');

async function readLines() {
    const stream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({ input: stream });

    const lines = [];

    for await (const line of rl) {
        lines.push(line);
    }

    return lines;
}

function isInRanges(num, ranges) {
    return ranges.some(r => num >= r.start && num <= r.end);
}

readLines().then(lines => {
    const chunks = lines
        .join('\n')
        .split(/\n\s*\n/)
        .map(chunk => chunk.split('\n').filter(line => line.trim() !== ''));

    const fresh_ranges = chunks[0].map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end };
    });

    let fresh_count = 0;

    chunks[1].forEach((line, index) => {
        fresh_count += isInRanges(line, fresh_ranges) ? 1 : 0;
    });

    console.log(fresh_count);
});