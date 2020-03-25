import React, { Suspense } from 'react'
import routes from './config/routes'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import Setting from './pages/Setting'
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams,
  useHistory
} from 'react-router-dom'
import history from './history'

function App() {
  // let routeLogin = routes.find(r => r.path === '/login')
  // let routeDashboard = routes.find(r => r.path === '/dashboard')
  return (

    <div>
      <Router history={history}>
        <Suspense fallback={<div>Loading.....</div>}>
          <Switch>
            {/* // routing */}
            {routes.map(({ path, isProtected, component: Component }) => {
              return <Route
                key={path}
                path={path}
                exact
                render={() => {
                  if (isProtected && !localStorage.getItem('token')) {
                    return <Redirect to={'/login'} key={'/login'} />
                  } else return <Component />
                }}
              />
            })}
          </Switch>
        </Suspense>
      </Router>
    </div>

  )
}

export default App