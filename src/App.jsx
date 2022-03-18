import { useState } from 'react'

import { RouterContext } from './context/routerContext'
import { getInitialRoute } from './router'

import { Index } from './page/Index'

function App() {
  const initialRoute = getInitialRoute()
  // keep key name exactly like this
  const [currentRouterName, setCurrentRouterName] = useState(initialRoute.name)

  return (
    <>
      <RouterContext.Provider
        value={{
          currentRouterName,
          setCurrentRouterName
        }}
      >
        <Index />
      </RouterContext.Provider>
    </>
  )
}

export default App
