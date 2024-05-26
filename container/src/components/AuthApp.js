import React from "react"
import { mount } from "auth/AuthApp"
import { useHistory } from "react-router-dom"

const AuthApp = ({ onSignIn }) => {
  const ref = React.useRef(null)
  const history = useHistory()

  React.useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname, // Initial path to start the history
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },

      onSignIn,
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

export default AuthApp
