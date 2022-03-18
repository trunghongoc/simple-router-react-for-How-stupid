import { useMemo, useContext, Suspense } from 'react'

import { RouterContext } from './../context/routerContext'
import { ROUTER_NAME } from './name'
import { router } from './list'

const findRoute = pageName => {
  if (!pageName || typeof pageName !== 'string') {
    return null
  }

  return router.find(route => route.name === pageName)
}

export const useRenderPageByRouter = () => {
  const routerContext = useContext(RouterContext)

  const currentRoute = useMemo(() => {
    const route = findRoute(routerContext.currentRouterName)

    return route
  }, [routerContext.currentRouterName])

  const CurrentPage = useMemo(() => {
    if (!currentRoute) {
      return <div>Not Found</div>
    }

    const Page = currentRoute.component

    return (
      <>
        <Page />
      </>
    )
  }, [currentRoute])

  return (
    <>
      <Suspense fallback={null}>{CurrentPage}</Suspense>
    </>
  )
}

export const useRouter = () => {
  const routerContext = useContext(RouterContext)

  const currentRoute = useMemo(() => {
    const route = findRoute(routerContext.currentRouterName)

    return route
  }, [routerContext.currentRouterName])

  const goTo = routeName => {
    const isSameCurrentRouter = routeName === routerContext.currentRouterName

    if (isSameCurrentRouter) {
      return
    }

    const route = findRoute(routeName)

    if (!route) {
      return
    }

    if (routerContext.setCurrentRouterName) {
      routerContext.setCurrentRouterName(routeName)
    }
  }

  return {
    currentRoute,
    ROUTER_NAME,
    findRoute,
    goTo
  }
}
