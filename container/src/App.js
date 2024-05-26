import React, { lazy, Suspense } from "react"
import { StylesProvider, createGenerateClassName } from "@material-ui/styles"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import MarketingApp from "./components/MarketingApp"
import Header from "./components/Header"
import AuthApp from "./components/AuthApp"
import Progress from "./components/Progress"

const MarketingLazy = lazy(() => import("./components/MarketingApp"))
const AuthLazy = lazy(() => import("./components/AuthApp"))

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
})

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false)

  return (
    <>
      <BrowserRouter>
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
                <Route path="/" component={MarketingLazy} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
