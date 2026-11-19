import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.*)$/, replacement: `${src}/$1` },
      // The real package throws outside a React Server Components build.
      { find: /^server-only$/, replacement: fileURLToPath(new URL("./tests/stubs/server-only.ts", import.meta.url)) },
    ],
  },
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
});
