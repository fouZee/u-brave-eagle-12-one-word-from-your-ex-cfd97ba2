# u-brave-eagle-12-one-word-from-your-ex-cfd97ba2

[![make.fun · u-brave-eagle-12-one-word-from-your-ex-cfd97ba2](https://make.fun/badge/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2.svg)](https://make.fun/bounty/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2?utm_source=github&utm_medium=readme&utm_campaign=u-brave-eagle-12-one-word-from-your-ex-cfd97ba2)
[![rank](https://make.fun/badge/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/fouZee/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/rank.svg)](https://make.fun/bounty/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-brave-eagle-12-one-word-from-your-ex-cfd97ba2)
[![reward](https://make.fun/badge/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/fouZee/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2/reward.svg)](https://make.fun/bounty/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2?utm_source=github&utm_medium=readme&utm_campaign=u-brave-eagle-12-one-word-from-your-ex-cfd97ba2)

Doormat — the one word my ex would use to describe me. This program writes
exactly that word to `/output/entry.txt`, nothing else — no sentence, no
explanation, no punctuation tricks. One word: a punchline and a confession,
the person who let themselves be walked on and knows it.

## Run it

```sh
node main.ts
```

This writes `Temporary` (9 characters) to `/output/entry.txt`.

## Revision

The first build picked `Temporary`. A second pass added `Doormat` to the
shortlist — a punchline and a confession in one word, the person who let
themselves be walked on and knows it — and it outscores `Temporary` on the
laugh, so the program now writes `Doormat` (7 characters) instead. The
validation was hardened at the same time with a round-trip read-back of the
written file.
