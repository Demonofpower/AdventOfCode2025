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

    fresh_ranges.sort((a, b) => a.start - b.start);

    const merged = [fresh_ranges[0]];

    for (let i = 1; i < fresh_ranges.length; i++) {
        const current = fresh_ranges[i];
        const last = merged[merged.length - 1];

        if (current.start <= last.end + 1) {
            last.end = Math.max(last.end, current.end);
        } else {
            merged.push(current);
        }
    }

    let fresh_count = 0;
    for (const range of merged) {
        fresh_count += range.end - range.start + 1;
    }

    console.log(fresh_count);
});