import { dynamicImportsWithoutComments, getReplacer } from '../src/update.js'

describe('getReplacer', () => {
  const simple = "import('/path/to/file.js')"
  const multiline = `
    import(
      "/path/to/test"
    )
  `
  const commented = "import(/* webpackChunkName: foo */ 'path/to/file'"
  const multilineCommented = `
    import(
      /* some comment */
      'path/to/test'
    )
  `
  const inComment = "// import('/path/to/test')"
  const inMultilineComment = `
      /*
        some comment
        import('/path/to/test')
      */
  `

  it('creates a func that adds magic comments for webpackChunkName', () => {
    const replacer = getReplacer('some/module/path.js')

    expect(simple.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.stringContaining('/* webpackChunkName: "path-to-file" */')
    )
    expect(multiline.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.stringContaining('/* webpackChunkName: "path-to-test" */')
    )
    expect(commented.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.not.stringContaining('/* webpackChunkName: "path-to-test" */')
    )
    expect(multilineCommented.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.not.stringContaining('/* webpackChunkName: "path-to-test" */')
    )
    expect(inComment.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.not.stringContaining('/* webpackChunkName: "path-to-test" */')
    )
    expect(inMultilineComment.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      expect.not.stringContaining('/* webpackChunkName: "path-to-test" */')
    )
    expect(simple.replace(dynamicImportsWithoutComments, replacer)).toEqual(
      `import(/* webpackChunkName: "path-to-file" */ '/path/to/file.js')`
    )
  })

  it('responds to options', () => {
    expect(
      simple.replace(
        dynamicImportsWithoutComments,
        getReplacer('some/module/path.js', { verbose: true, webpackMode: 'weak' })
      )
    ).toEqual(
      expect.stringContaining(
        '/* webpackChunkName: "path-to-file", webpackMode: "weak" */'
      )
    )
  })
})
