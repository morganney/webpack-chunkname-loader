const dynamicImportsWithoutComments =
  /(?<!\w|\*[\s\w]*?|\/\/\s*)import\s*\((?!\s*\/\*)(?<path>\s*?['"`].+['"`]\s*)\)/g
const getReplacer =
  (filepath, options = {}) =>
  (match, capturedImportPath) => {
    const comment = []
    const importPath = capturedImportPath.trim()
    const parts = importPath
      .replace(/['"`]/g, '')
      .split('/')
      .filter(part => /\w/.test(part))
    const name = parts.reduce((prev, curr) => {
      if (/^\${/.test(curr)) {
        return prev ? `${prev}-[request]` : '[request]'
      }

      return prev ? `${prev}-${curr}` : curr
    }, '')

    if (name) {
      comment.push(`webpackChunkName: "${name.replace(/\.[cm]?j?t?sx?$/, '')}"`)
    }

    if (options.webpackMode) {
      comment.push(`webpackMode: "${options.webpackMode}"`)
    }

    const replaced = match.replace(
      capturedImportPath,
      `/* ${comment.join(', ')} */ ${importPath}`
    )

    if (options.verbose) {
      // eslint-ignore-next-line no-console
      console.log(`[WCNL] ${filepath} : ${replaced}`)
    }

    return replaced
  }

export { dynamicImportsWithoutComments, getReplacer }
