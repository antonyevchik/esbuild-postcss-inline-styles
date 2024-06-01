import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "lib/esbuild-postcss-inline-styles.js",
  packages: "external",
});
