import * as esbuild from "esbuild";
import fs from "fs";

import postcssInlineStylesPlugin from "../lib/esbuild-postcss-inline-styles.js";

describe("Postcss Inline Styles Plugin Test", () => {
  test("Build lib case", async () => {
    await esbuild.build({
      entryPoints: ["tests/src/index.js"],
      bundle: true,
      outfile: "tests/dist/out.js",
      plugins: [postcssInlineStylesPlugin()],
      packages: "external",
    });

    expect(fs.existsSync("tests/dist/out.js")).toBe(true);

    expect(
      fs.readFileSync("tests/dist/out.js", "utf-8").indexOf(`-moz-placeholder`),
    ).not.toBe(-1);
  });
});
