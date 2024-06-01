# Description

Postcss plugin for [esbuild](https://esbuild.github.io/) with support of injecting css styles into js bundle file. \
The plugin will process the styles with `postcss` and inject them into the `out.js` bundle file,
so you will get a single bundle file with the styles inside.

## Install

```bash
npm i -D esbuild-plugin-postcss-inline-styles
```
or yarn
```bash
yarn add -D esbuild-plugin-postcss-inline-styles
```

## Usage

The example below shows usage plugin with `tailwind` and `autoprefixer`. \
Create and configure `postcss.config.js` file.

```js
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

Create `main.css` file: 
```css
/** main.css **/

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import `main.css` to `index.js`:

```js
// index.js

import 'main.css'
```

Import plugin to your `esbuild.config.js`

```js
// esbuild.config.js

import * as esbuild from 'esbuild'
import postcssInlineStyles from 'esbuild-plugin-postcss-inline-styles'

await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    outfile: 'out.js',
    plugins: [postcssInlineStyles()],
  })
```
It is not necessary to pass additional parameters to the plugin, all plugins for postcss are described in `postcss.config.js`.