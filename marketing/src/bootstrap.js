import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App"

/*
Mount the function to start the app (React application) to the DOM
Differentiate if we are in development or production
Export the function to start the app
*/

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory() // If we are in development, use createMemoryHistory

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} />, el)

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
  const devRoot = document.querySelector("#_marketing-dev-root")

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    })
  }
}

// Export the mount function to be used in the container

export { mount }
