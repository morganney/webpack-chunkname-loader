//import('react-leaflet')
import { useEffect, lazy } from 'react'
import { Redirect, Route, Router } from 'react-router-dom'
import { Debug } from 'webpack-strip-debug-loader'

import('./ignore/file')
import('./ignore/notIgnore/not')

/* import('./this/comment/style/is/ok') */

// import('react-leaflet');import('something/else/but-ok-behind-single-line-comment.js')
// import('commented-out-module')

/**
 * Try not to have commented out `import()` statements.
 * 
 * If you must then single line comments are ok
 * // import('some-commented-out-module')
 * 
 * If you must comment out more than one import(),
 * then make sure each import('statement') in a line
 * is preceded with an aterisk, otherwise boom, your
 * build will break from the repeated import('statements').
 */

const debug = Debug('webpack-app')
const name = "InterestProfilerRoutes"

debug('being imported')

const someObject = {
  import(a, b) {
    console.log('import', a, b)
  }
}

someObject.import('foo/bar')

const Routes = () => {
  useEffect(() => {
    const loadLocales = async () => {
      const mod = await import(`./locales/${languages}`)
    }
    import('react-redux').then((mod) => {
      console.log(mod)
    })
    loadLocales()

    if (/* import('inside-if') */ true)
    import('./someModule')
    import('./prefetch/file')
    import('./prefetch/sub/file.js')
  })

  /**
   * import('./routes/AdminRoutes')
   * foo();
   * import('./ignore/these.js')
   */

  /*
    blah
    import('/should/not/break')

    with other text
      */
  return (
    <Router history={browserHistory}>
      <Route path="/index">
        <Redirect to="/" />
      </Route>

      <Route
        path="/admin"
        component={lazy(() =>
          import(/* webpackChunkName: "admin-untouched" */ './routes/AdminRoutes'))}
      />
      <Route
        path="/budget"
        component={lazy(() =>
          import('./routes/BudgetRoutes'))}
      />

      <Route
        path="/ip"
        component={lazy(() =>
          import(
            `./routes/${name}`
          ))}
      />
    </Router>
  )
}

