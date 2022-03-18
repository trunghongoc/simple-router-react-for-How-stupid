import { useMemo, useContext, Suspense } from 'react'

import { RouterContext } from './../context/routerContext'
import { ROUTER_NAME } from './name'
import { router, firstRoute } from './list'

import { serialize } from './helper'

export const findRoute = pageName => {
  if (!pageName || typeof pageName !== 'string') {
    return null
  }

  return router.find(route => route.name === pageName)
}

const findRouteByPath = path => {
  if (!path || typeof path !== 'string') {
    return null
  }

  return router.find(route => route.pathRegex.test(path))
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

const fillValueToPathParamsUrl = (path, params) => {
  let newPath = path

  // Check is plain object
  if (params && typeof params === 'object' && !Array.isArray(params)) {
    // fill value to each params (for optional params first)
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const strParamsRegex = `/\?:${key}`
        newPath = newPath.replace(new RegExp(strParamsRegex), `/${params[key]}`)
      }
    }

    // fill value to each params (for required params second)
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const strParamsRegex = `/:${key}`
        newPath = newPath.replace(new RegExp(strParamsRegex), `/${params[key]}`)
      }
    }
  }

  return newPath
}

const fillQueriesStringToPathUrl = (newPath, queriesObj) => {
  const isObj =
    queriesObj && typeof queriesObj === 'object' && !Array.isArray(queriesObj)

  const queries = isObj ? `?${serialize(queriesObj)}` : ''

  return newPath + queries
}

const checkIsRequiredParamsWasMissed = newPath => {
  let isInvalid = false

  if (newPath.indexOf('/:') > -1) {
    isInvalid = true
  }

  if (isInvalid) {
    const listOfMissed = newPath.match(/:[^\/:]+/g)
    const errorMessage = `Navigation was missed required params: ${listOfMissed.join(
      ', '
    )}`

    console.error(errorMessage)
  }

  return isInvalid
}

export const getAndFillDataToNewPath = (path, payload) => {
  let isValidPath = true
  let newPath = path

  // fill params value
  if (payload && payload.params) {
    newPath = fillValueToPathParamsUrl(newPath, payload.params)
  }

  const isMissedParams = checkIsRequiredParamsWasMissed(newPath)
  if (isMissedParams) {
    isValidPath = false
  }

  // fill queries value
  if (payload.query) {
    newPath = fillQueriesStringToPathUrl(newPath, payload.query)
  }

  return { isValidPath, newPath }
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

  const goToWithPath = (routeName, payload = {}) => {
    const route = checkIsGoToRightPage(routeName)

    if (route && routerContext.setCurrentRouterName) {
      const { isValidPath, newPath } = getAndFillDataToNewPath(
        route.path,
        payload
      )

      if (route.path && isValidPath) {
        window.history.pushState({}, null, newPath)
      }

      if (isValidPath) {
        routerContext.setCurrentRouterName(routeName)
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
