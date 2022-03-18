import { useState } from 'react'

import { RouterContext } from './context/routerContext'
import { firstRoute } from './router/list'

import { Index } from './page/Index'

function App() {
  // keep key name exactly like this
  const [currentRouterName, setCurrentRouterName] = useState(firstRoute.name)

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
