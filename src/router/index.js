import { useMemo, useContext, Suspense } from 'react'

import { RouterContext } from './../context/routerContext'
import { ROUTER_NAME } from './name'
import { router, firstRoute } from './list'

const findRoute = pageName => {
  if (!pageName || typeof pageName !== 'string') {
    return null
  }

  return router.find(route => route.name === pageName)
}

const findRouteByPath = path => {
  if (!path || typeof path !== 'string') {
    return null
  }

  return router.find(route => route.path === path)
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

  const checkIsGoToRightPage = routeName => {
    const isSameCurrentRouter = routeName === routerContext.currentRouterName

    if (isSameCurrentRouter) {
      return false
    }

    const route = findRoute(routeName)

    if (!route) {
      return false
    }

    return route
  }

  const goTo = routeName => {
    const route = checkIsGoToRightPage(routeName)

    if (route && routerContext.setCurrentRouterName) {
      routerContext.setCurrentRouterName(routeName)
    }
  }

  const goToWithPath = routeName => {
    const route = checkIsGoToRightPage(routeName)

    if (route && routerContext.setCurrentRouterName) {
      routerContext.setCurrentRouterName(routeName)

      if (route.path) {
        window.history.pushState({}, null, route.path)
      }
    }
  }

  return {
    currentRoute,
    ROUTER_NAME,
    findRoute,
    goTo,
    goToWithPath
  }
}

export const getInitialRoute = () => {
  const pathName = window.location.pathname
  const route = findRouteByPath(pathName) || firstRoute

  return route
}
