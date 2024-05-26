import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App"

/*
Mount the function to start the app (React application) to the DOM
Differentiate if we are in development or production
Export the function to start the app
*/

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath], // Initial path to start the history
    })

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    },
  }
}

// If we are in development and in isolation, call mount immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root")

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    })
  }
}

// Export the mount function to be used in the container

export { mount }
