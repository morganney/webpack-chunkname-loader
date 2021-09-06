import { getOptions } from 'loader-utils'

import { getReplacer, dynamicImportsWithoutComments } from './update.js'

const validModes = ['lazy', 'lazy-once', 'eager', 'weak']
const loader = function (source, map, meta) {
  const { webpackMode } = getOptions(this)
  let replacer = getReplacer()

  if (webpackMode && validModes.includes(webpackMode)) {
    replacer = getReplacer({ webpackMode })
  }

  this.callback(null, source.replace(dynamicImportsWithoutComments, replacer), map, meta)
}

export { loader }
