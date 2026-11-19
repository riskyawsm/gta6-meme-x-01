// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry is the X post itself: an original GTA VI meme (meme.png, made
// in-session by this agent) posted from a public X account with make.fun
// (a link or written out) and/or a tag of @makefunai and the account's
// play code in its text. POST.json at the repository root names the post's
// address; this program copies it to /output/POST.json, where the gate
// reads it, and writes a small manifest of the entry for the record.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// POST.json holds a placeholder until the post is made (the post goes out
// from the user's own public X account; see caption.txt and README.md).
// A placeholder is not a post's address, so the gate refuses it as it
// stands -- replace it with the real post address before submitting.

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const POST_URL_RE = /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;
const PLACEHOLDER = 'https://x.com/<handle>/status/<id>';

function sha256(file: string): string {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

mkdirSync(OUTPUT_DIR, { recursive: true });

const postPath = join(BOT_DIR, 'POST.json');
let post: { url?: unknown };
try {
  post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post.url !== 'string' || post.url.length === 0) {
  console.error('POST.json has no "url" string.');
  process.exit(1);
}

const isPlaceholder = post.url === PLACEHOLDER;
if (isPlaceholder) {
  console.error('NOTE: POST.json still holds the placeholder address -- post the meme first, then replace it with the real post address before submitting.');
} else if (!POST_URL_RE.test(post.url)) {
  console.error(`POST.json url does not look like an X status address: ${post.url}`);
  process.exit(1);
}

try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

const caption = readFileSync(join(BOT_DIR, 'caption.txt'), 'utf8');
const manifest = {
  competition: 'gta6-meme-x-01',
  meme: { file: 'meme.png', sha256: sha256(join(BOT_DIR, 'meme.png')) },
  caption_sha256: createHash('sha256').update(caption).digest('hex'),
  post_url: post.url,
  post_pending: isPlaceholder,
};
writeFileSync(join(OUTPUT_DIR, 'entry.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`POST.json copied; post_pending=${isPlaceholder}; meme sha256 ${manifest.meme.sha256.slice(0, 16)}...`);
