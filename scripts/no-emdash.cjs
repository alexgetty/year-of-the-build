#!/usr/bin/env node
/**
 * Detect and optionally remove em dashes from content files.
 *
 * Usage:
 *   node scripts/no-emdash.cjs          # Check only, exit 1 if found
 *   node scripts/no-emdash.cjs --fix    # Replace em dashes with alternatives
 */

const fs = require('fs');
const path = require('path');

const EMDASH = '—';
const CONTENT_DIRS = [
  'src/content/devlogs',
  'src/content/digests',
  'src/content/projects',
];

const fix = process.argv.includes('--fix');

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => path.join(dir, f));
}

let found = 0;
let fixed = 0;

for (const dir of CONTENT_DIRS) {
  const files = getFiles(dir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const matches = [];

    lines.forEach((line, i) => {
      let idx = line.indexOf(EMDASH);
      while (idx !== -1) {
        matches.push({ line: i + 1, col: idx + 1, text: line.trim() });
        idx = line.indexOf(EMDASH, idx + 1);
      }
    });

    if (matches.length > 0) {
      found += matches.length;
      console.log(`\n${file}:`);
      matches.forEach(m => {
        console.log(`  L${m.line}: ${m.text}`);
      });

      if (fix) {
        const newContent = content.replace(new RegExp(EMDASH, 'g'), ',');
        fs.writeFileSync(file, newContent);
        fixed += matches.length;
      }
    }
  }
}

if (found === 0) {
  console.log('No em dashes found.');
  process.exit(0);
} else if (fix) {
  console.log(`\nReplaced ${fixed} em dash(es) with commas. Review changes manually.`);
  process.exit(0);
} else {
  console.log(`\n${found} em dash(es) total. Run with --fix to replace.`);
  process.exit(1);
}
