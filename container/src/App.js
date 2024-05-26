import React, { lazy, Suspense } from "react"
import { StylesProvider, createGenerateClassName } from "@material-ui/styles"
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  Redirect,
} from "react-router-dom"
import { createBrowserHistory } from "history"
import Header from "./components/Header"
import Progress from "./components/Progress"

const MarketingLazy = lazy(() => import("./components/MarketingApp"))
const AuthLazy = lazy(() => import("./components/AuthApp"))
const DashboardLazy = lazy(() => import("./components/Dashboard"))

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
})

const history = createBrowserHistory()

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false)

  React.useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard")
    }
  }, [isSignedIn])

  return (
    <>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header
              isSignedIn={isSignedIn}
              onSignOut={() => setIsSignedIn(false)}
            />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/dashboard">
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardLazy />
                </Route>
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </Router>
    </>
  )
}

export default App
