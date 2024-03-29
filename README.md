# [`webpack-chunkname-loader`](https://www.npmjs.com/package/webpack-chunkname-loader)

![CI](https://github.com/morganney/webpack-chunkname-loader/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/morganney/webpack-chunkname-loader/branch/main/graph/badge.svg?token=1DWQL43B8V)](https://codecov.io/gh/morganney/webpack-chunkname-loader)

> [!WARNING]
> Uses a regex to find dynamic import expressions, your mileage may vary.
> For parser support use `magic-comments-loader`.

Adds `webpackChunkName` [magic coments](https://webpack.js.org/api/module-methods/#magic-comments) to your dynamic import expressions.

If you need other magic comments or more configuration options use [magic-comments-loader](https://github.com/morganney/magic-comments-loader).

## Usage

First `npm install webpack-chunkname-loader`.

### Configuration

Add this inside your `webpack.config.js`:

```js
module: {
  rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['webpack-chunkname-loader']
    }
  ]
}
```

You can supply an option to include `webpackMode` magic comments:

```js
module: {
  rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'webpack-chunkname-loader',
          options: {
            webpackMode: 'eager'
          }
        }
    }
  ]
}
```

## Magic Comments

With `webpack-chunkname-loader` added to your webpack build, the following dynamic `import`:

```js
const dynamicModule = await import('./path/to/some/module')
```

becomes:

```js
const dynamicModule = await import(/* webpackChunkName: "path-to-some-module" */ './path/to/some/module')
```
