import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const commonFile = path.join(root, "README.common.md");
const scopedOut = path.join(root, "packages/slider/README.md");
const unscopedOut = path.join(root, "packages/slider-shim/README.md");

const content = fs.readFileSync(commonFile, "utf8");

function extract(content, tag) {
  const regex = new RegExp(`<!-- @${tag}:start -->([\\s\\S]*?)<!-- @${tag}:end -->`, "m");
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}

const scopedHeader = extract(content, "SCOPE");
const unscopedHeader = extract(content, "UNSCOPE");
const shared = content
  .replace(/<!-- @SCOPE:[\s\S]*?@SCOPE:end -->/g, "")
  .replace(/<!-- @UNSCOPE:[\s\S]*?@UNSCOPE:end -->/g, "")
  .trim();

fs.writeFileSync(scopedOut, `${scopedHeader}\n\n${shared}`, "utf8");
fs.writeFileSync(unscopedOut, `${unscopedHeader}\n\n${shared}`, "utf8");

console.log("✅ Generated README files for scoped and unscoped packages.");
