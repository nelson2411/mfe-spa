import { createApp } from "vue"
import Dashboard from "./components/Dashboard.vue"
/*
Mount the function to start the app (React application) to the DOM
Differentiate if we are in development or production
Export the function to start the app
*/

const mount = (el) => {
  const app = createApp(Dashboard) // Create the Vue app
  app.mount(el)
}

// If we are in development and in isolation, call mount immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root")

  if (devRoot) {
    mount(devRoot)
  }
}

// Export the mount function to be used in the container

export { mount }
