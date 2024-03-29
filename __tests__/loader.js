import { jest } from '@jest/globals'

import { loader } from '../src/loader.js'

describe('loader', () => {
  const getStub = (options = { webpackChunkName: true, webpackMode: 'lazy' }) => ({
    utils: {
      contextify: () => './some/path.js'
    },
    callback: jest.fn((err, commentedSrc) => {
      return commentedSrc
    }),
    getOptions: jest.fn(() => options)
  })

  it('modifies dynamic imports in source files', async () => {
    const stub = getStub()
    const src = 'import("src/to/file")'
    const stubInvalid = getStub({
      query: {
        webpackMode: 'invalid'
      }
    })

    loader.call(stub, src)
    expect(stub.callback).toHaveBeenCalledWith(
      null,
      'import(/* webpackChunkName: "src-to-file", webpackMode: "lazy" */ "src/to/file")',
      undefined,
      undefined
    )
    loader.call(stubInvalid, src)
    expect(stubInvalid.callback).toHaveBeenCalledWith(
      null,
      'import(/* webpackChunkName: "src-to-file" */ "src/to/file")',
      undefined,
      undefined
    )
  })
})
