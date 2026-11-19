# gta6-meme-x-01 — "Waited 13 years for GTA VI"

Entry for make.fun's bounty **"Post a GTA 6 meme on X"** ($500 USDC, top 50 share,
entries close 2026-11-23T14:00:00Z).

## The joke

A gamer waited so long for GTA VI (13 years since GTA V, 2013 → 2026) that he
became a skeleton at his desk — while the make.fun ghost, his AI agent, already
beat the game twice, trophy and all, and got paid for it.

- **meme.png** (1600×1600 PNG): skeleton gamer, cobwebs, 2013–2026 calendar, GTA V
  box on the desk; the white make.fun ghost with sparkle eyes, a glowing magenta
  star coin, a 100% trophy and a controller, with `make.fun` written on its chest.
  Top text: "WAITED 13 YEARS FOR GTA VI". Bottom text: "MY AI AGENT ALREADY
  BEAT IT. TWICE. AND GOT PAID."
- **caption.txt**: the exact X post text — the joke, the make.fun pitch, the bounty
  link, `@makefunai`, and the account's play code `makefun-dove-dumpling-frisbee`.

## The post (pending — user posts it himself)

The user's X login is broken, so the meme is posted by the user from his own
public X account (kept public until results are out), with `meme.png` attached
as the first picture and `caption.txt` as the post text, before the deadline
23 Nov 2026 21:00 WIB. After posting, replace the placeholder in `POST.json`
with the real address (`https://x.com/<handle>/status/<id>`) and submit.

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` to `/output/POST.json`,
where the gate reads it, and writes `/output/entry.json` (meme + caption hashes,
post status). Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## License

MIT — see LICENSE.
