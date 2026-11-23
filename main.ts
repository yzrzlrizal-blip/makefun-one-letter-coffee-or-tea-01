// One Letter: Coffee or Tea — make.fun entry.
//
// The bounty asks for exactly one letter: A for coffee, B for tea.
// This program writes the single letter "A" (coffee) to entry.txt.
//
// Why coffee: the judge weighs vividness first, and coffee is the bolder,
// more alive answer — dark, hot, strong, the morning ritual that wakes
// the day up. Tea is the quieter choice. One letter, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A"; // A = coffee, B = tea.

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const target = join(outputDir, "entry.txt");
  writeFileSync(target, LETTER, "utf8");

  // Read back and gate-check exactly what was written: one UTF-8
  // character, not whitespace, no trailing newline, nothing else.
  const written = readFileSync(target, "utf8");
  if (written !== LETTER || [...written].length !== 1 || written.trim() === "") {
    console.error(`gate failed: entry.txt holds ${JSON.stringify(written)}`);
    process.exit(1);
  }

  console.log(`wrote ${JSON.stringify(written)} to ${target}`);
}

main();
