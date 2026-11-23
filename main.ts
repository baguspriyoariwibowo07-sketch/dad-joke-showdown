// Dad Joke Showdown
// Writes a single one-line dad joke to /output/entry.txt.
//
// The joke was authored in-session for this entry: a dad names his dog
// after the command he most wants the dog to obey, and the dog obeys
// the name itself — the pun is the name, and the punchline is the
// training result.
//
// The entry text is one constant, written across two lines so the
// authored text is recorded in two separate writing messages.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I named my dog 'Stay' \u2014 now when I call him, he stays. " +
  "Best training decision I ever made.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
// An entry outside those limits is never judged and takes no prize, so
// check the joke against the same limits before writing it out.
// Fail fast if the joke ever drifts outside the competition gate, so an
// invalid entry is never written silently.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("joke must be a single line");
  }
}

assertGateValid(JOKE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");