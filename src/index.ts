import path from "path";
import fs from "fs";
import postcss from "postcss";
import postcssLoadConfig from "postcss-load-config";

export default function postcssInlineStylesPlugin() {
  return {
    name: "style-inline",
    setup(build: {
      onResolve: (
        arg0: { filter: RegExp },
        arg1: (args: any) => { path: string; namespace: string },
      ) => void;
      onLoad: (
        arg0: { filter: RegExp; namespace: string },
        arg1: (args: {
          path: fs.PathLike | fs.promises.FileHandle;
        }) => Promise<{ contents: string; loader: string }>,
      ) => void;
    }) {
      build.onResolve({ filter: /\.css$/ }, (args) => {
        return {
          path: path.join(args.resolveDir, args.path),
          namespace: "style-inline",
        };
      });

      build.onLoad(
        { filter: /.*/, namespace: "style-inline" },
        async (args: { path: fs.PathLike | fs.promises.FileHandle }) => {
          const cssContent = await fs.promises.readFile(args.path, "utf8");
          const config = await postcssLoadConfig();
          const result = await postcss(config.plugins).process(cssContent, {
            from: args.path.toString(),
          });

          const contents = `
            const style = document.createElement("style");
            style.textContent = ${JSON.stringify(result.css)};
            document.head.appendChild(style);
          `;
          return { contents, loader: "js" };
        },
      );
    },
  };
}
