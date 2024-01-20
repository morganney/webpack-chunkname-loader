import { getReplacer, dynamicImportsWithoutComments } from './update.js'

const validModes = ['lazy', 'lazy-once', 'eager', 'weak']
const loader = function (source, map, meta) {
  const options = this.getOptions()
  const filepath = this.utils
    .contextify(this.rootContext, this.resourcePath)
    .replace(/^\.\/?/, '')
  const replacerArgs = validModes.includes(options.webpackMode)
    ? [filepath, options]
    : [filepath, { verbose: options.verbose }]
  const replacer = getReplacer(...replacerArgs)

  this.callback(null, source.replace(dynamicImportsWithoutComments, replacer), map, meta)
}

export { loader }
