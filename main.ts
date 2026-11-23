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

// The output directory comes from the first CLI argument, then
// MAKEFUN_OUTPUT_DIR, then the sandbox default /output, so the same
// program runs unchanged in the grader and in a local test.
function outputDir(): string {
  const fromArg = process.argv[2];
  if (fromArg !== undefined && fromArg !== "") return fromArg;
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") return fromEnv;
  return "/output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });

  const target = join(dir, "entry.txt");
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
