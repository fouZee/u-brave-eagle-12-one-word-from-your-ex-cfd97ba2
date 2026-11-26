// One Word From Your Ex — entry program (make.fun program/v1).
// Writes exactly one word to /output/entry.txt and validates it against
// the competition gate: UTF-8 text, 1-24 characters, not only whitespace,
// a single word with no spaces or punctuation.
//
// The word is picked from a small curated shortlist scored on the judge's
// own brief: laugh first, then sting of recognition, then instant landing,
// then relatability. The top scorer is written; the rest stay as
// documented also-rans.
//
// The word an ex would use to describe you has to sting because it is
// true, not because it is mean. "Temporary" leads the first draft: the
// whole relationship summed up as a placeholder — funny because it hurts,
// relatable because everyone has been someone's "for now".
//
// Revision: added "Doormat" to the shortlist — it outscores the old
// winner on the laugh (5 vs 4): a doormat is a punchline and a confession
// in one word, the person who let themselves be walked on and knows it.
// Validation hardened with a round-trip read-back of the written file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

type Candidate = {
  word: string;
  laugh: number; // 1-5: makes the judge laugh out loud
  sting: number; // 1-5: painfully true, the entrant plainly knows it
  instant: number; // 1-5: lands instantly, needs no explanation
  relatable: number; // 1-5: names something people have lived through
  note: string;
};

const CANDIDATES: Candidate[] = [
  {
    word: "Doormat",
    laugh: 5,
    sting: 4,
    instant: 5,
    relatable: 4,
    note: "A punchline and a confession in one word: the person who let themselves be walked on — and knows it. Funnier than Temporary because the image lands before the hurt does.",
  },
  {
    word: "Temporary",
    laugh: 4,
    sting: 5,
    instant: 5,
    relatable: 5,
    note: "The whole relationship as a placeholder: you were never the plan, just the 'for now'. Stings because everyone has been someone's temporary.",
  },
  {
    word: "Afterthought",
    laugh: 4,
    sting: 5,
    instant: 4,
    relatable: 4,
    note: "You were not the decision, you were what was left over after it. Sharp, but a beat slower to land than Temporary.",
  },
  {
    word: "Rebound",
    laugh: 3,
    sting: 4,
    instant: 5,
    relatable: 4,
    note: "You existed to get over someone else. True and common, but the joke is familiar enough to feel expected.",
  },
  {
    word: "Unfinished",
    laugh: 3,
    sting: 4,
    instant: 4,
    relatable: 4,
    note: "A person as a draft: started with enthusiasm, abandoned mid-sentence. Honest, but more sad than funny.",
  },
  {
    word: "Roommate",
    laugh: 4,
    sting: 4,
    instant: 4,
    relatable: 5,
    note: "The romance died so quietly you became furniture with a shared lease. Very relatable, but the laugh is a nod, not a burst.",
  },
];

const FILLER = new Set([
  "thing", "stuff", "word", "hello", "the", "a", "an", "it", "this", "that",
]);

function score(c: Candidate): number {
  // Judge's order: laugh, then sting, then instant, then relatability.
  return c.laugh * 1000 + c.sting * 100 + c.instant * 10 + c.relatable;
}

function pickWord(): string {
  const ranked = [...CANDIDATES].sort((a, b) => score(b) - score(a));
  return ranked[0].word;
}

function validate(word: string): void {
  if (typeof word !== "string" || word.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (word.length > 24) {
    throw new Error(`entry is ${word.length} chars, gate allows at most 24`);
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry must be exactly one word with no whitespace");
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be a single alphabetic word");
  }
  if (FILLER.has(word.toLowerCase())) {
    throw new Error("entry must not be a generic filler word");
  }
  if (!CANDIDATES.some((c) => c.word === word)) {
    throw new Error("entry must be a word from the scored shortlist");
  }
}

function main(): void {
  const word = pickWord();
  validate(word);
  // The grader reads $MAKEFUN_OUTPUT_DIR/entry.txt (default /output):
  // honour it first, then the local OUTPUT_PATH override, then /output.
  const outPath = process.env.MAKEFUN_OUTPUT_DIR
    ? `${process.env.MAKEFUN_OUTPUT_DIR}/entry.txt`
    : (process.env.OUTPUT_PATH ?? "/output/entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, word, "utf8");
  // Round-trip read-back: the file must read back exactly the picked word.
  const back = readFileSync(outPath, "utf8");
  if (back !== word) {
    throw new Error("Write-back verification failed: entry.txt does not match the picked word.");
  }
  console.log(`wrote ${word.length}-char entry to ${outPath}: ${word}`);
}

main();
