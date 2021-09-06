# webpack-chunkname-loader

Adds `webpackChunkName` [magic coments](https://webpack.js.org/api/module-methods/#magic-comments) to your dynamic import statements.

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

### Magic Comments

With `webpack-chunkname-loader` added to your webpack build, the following dynamic `import`:

```js
const dynamicModule = await import('./path/to/some/module')
```

becomes:

```js
const dynamicModule = await import(/* webpackChunkName: "path-to-some-module" */ './path/to/some/module')
```
