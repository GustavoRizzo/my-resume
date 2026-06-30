// Post-build flatten for GitHub Pages project-page hosting.
//
// React Router writes prerendered HTML under the basename (build/client/my-resume/…),
// while Vite emits assets/public files at build/client/. On the gh-pages branch the
// root maps to the /my-resume/ URL, so we lift the my-resume/* pages up to the client
// root and drop the wrapper. After this, build/client is published as-is:
//   build/client/assets/…   -> /my-resume/assets/…
//   build/client/en/…       -> /my-resume/en/…
import { existsSync } from "node:fs";
import { cp, rm, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDir = join(root, "build", "client");
const nestedDir = join(clientDir, "my-resume");

if (!existsSync(nestedDir)) {
  console.log("[postbuild] no build/client/my-resume to flatten — skipping");
  process.exit(0);
}

for (const entry of await readdir(nestedDir)) {
  await cp(join(nestedDir, entry), join(clientDir, entry), { recursive: true });
}
await rm(nestedDir, { recursive: true, force: true });

console.log("[postbuild] flattened build/client/my-resume/* into build/client/");
