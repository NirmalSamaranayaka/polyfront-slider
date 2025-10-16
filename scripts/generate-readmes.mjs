import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo root is the parent of /scripts
const repoRoot = path.resolve(__dirname, '..');

// Read the common README from repo root (not package CWD)
const commonFile = path.join(repoRoot, 'README.common.md');

// Output targets
const scopedOut   = path.join(repoRoot, 'packages/slider/README.md');
const unscopedOut = path.join(repoRoot, 'packages/slider-shim/README.md');
const rootOut     = path.join(repoRoot, 'README.md');

// --- helpers ---
function readFileSafe(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Missing file: ${p}`);
  }
  return fs.readFileSync(p, 'utf8');
}

function extract(content, tag) {
  const re = new RegExp(
    `<!-- @${tag}:start -->([\\s\\S]*?)<!-- @${tag}:end -->`,
    'm'
  );
  const m = content.match(re);
  return m ? m[1].trim() : '';
}

const content = readFileSafe(commonFile);

// Get scoped/unscoped/root headers
const scopedHeader   = extract(content, 'SCOPE');
const unscopedHeader = extract(content, 'UNSCOPE');
const rootHeader     = extract(content, 'ROOT'); // optional separate root header

// Strip the tagged blocks from the shared body
const shared = content
  .replace(/<!-- @SCOPE:start -->[\s\S]*?<!-- @SCOPE:end -->/g, '')
  .replace(/<!-- @UNSCOPE:start -->[\s\S]*?<!-- @UNSCOPE:end -->/g, '')
  .replace(/<!-- @ROOT:start -->[\s\S]*?<!-- @ROOT:end -->/g, '') // optional
  .trim();

// Ensure target dirs exist (idempotent)
fs.mkdirSync(path.dirname(scopedOut), { recursive: true });
fs.mkdirSync(path.dirname(unscopedOut), { recursive: true });

// Write all READMEs
fs.writeFileSync(scopedOut, `${scopedHeader}\n\n${shared}\n`, 'utf8');
fs.writeFileSync(unscopedOut, `${unscopedHeader}\n\n${shared}\n`, 'utf8');
fs.writeFileSync(rootOut, `${rootHeader || ''}\n\n${shared}\n`, 'utf8');

console.log('✅ Generated README files for scoped, unscoped, and root packages.');
