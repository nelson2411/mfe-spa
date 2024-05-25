import React from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import {
  StylesProvider,
  createGenerateClassname,
} from "@material-ui/core/styles"
import Landing from "./components/Landing"
import Pricing from "./components/Pricing"

const generateClassName = createGenerateClassname({
  productionPrefix: "ma",
})

function App() {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/pricing" component={Pricing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}

export default App
