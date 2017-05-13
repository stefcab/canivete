## *About*

Canivete (Brazilian Portuguese for swiss army knife) is an on-going personal project, a&nbsp;place to keep generic, multi-purpose Javascript functions.

Due to its multi-purpose nature, Canivete is not distributed as a single file, instead, one&nbsp;should import its functions as needed, using [ES6 module syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

[Babel](https://babeljs.io/) and [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/) are recommended to make Canivete work in older browsers.

---

## *Usage*

Since ES6 `import` has virtually [no browser support](https://caniuse.com/#feat=es6-module) at this time, a module bundler is needed to handle Canivete dependencies.

Here's how to use Canivete with [Rollup](#using-canivete-with-rollup) and [Webpack](#using-canivete-with-webpack).