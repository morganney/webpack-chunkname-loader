const dynamicImportsWithoutComments =
  /(?<!\w|\*[\s\w]*?|\/\/\s*)import\s*\((?!\s*\/\*)(\s*?['"`].+['"`]\s*)\)/g
const getReplacer =
  (options = {}) =>
  (match, p1) => {
    let webpackMode = ''
    const trimmed = p1.trim()
    const parts = trimmed.split('/').filter(part => /\w/.test(part))
    const name = parts.reduce((prev, curr) => {
      const slug = curr.replace(/['"`]/g, '')
      if (/^\${/.test(slug)) {
        return prev ? `${prev}-[request]` : '[request]'
      }

      return prev ? `${prev}-${slug}` : slug
    }, '')

    if (options.webpackMode) {
      webpackMode = `/* webpackMode: "${options.webpackMode}" */`
    }

    const replaced = match.replace(
      p1,
      `
    /* webpackChunkName: "${name}" */
    ${webpackMode}
    ${trimmed}
  `
    )
    console.log(replaced)
    return replaced
  }

export { dynamicImportsWithoutComments, getReplacer }
