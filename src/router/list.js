import { lazy } from 'react'

import { ROUTER_NAME } from './name'

export const firstRoute = {
  name: ROUTER_NAME.HOME,
  path: '/',
  component: lazy(() => import('./../page/Home'))
}

const _router = [
  {
    name: ROUTER_NAME.HOME,
    path: '/',
    component: lazy(() => import('./../page/Home'))
  },
  {
    name: ROUTER_NAME.REMEDIAL_ACTION_RESPONSE,
    path: '/remedial-action-response/?:id',
    component: lazy(() => import('./../page/RemedialActionResponse'))
  },
  {
    name: ROUTER_NAME.POST,
    path: '/post/:id/:autho',
    component: lazy(() => import('./../page/Post'))
  }
]

const getRouterWithPathMatch = () => {
  const getRegex = path => {
    if (path === '/') {
      return new RegExp(/^[/]{0,1}$/)
    }

    const result = path
      .replace(/\/:([^/:])+/g, '/([^/:])+')
      .replace(/\/\?:([^/:])+/g, `[/]*([^/:])*`)

    return new RegExp(result)
  }

  _router.forEach(route => {
    const path = route.path
    const regex = getRegex(path)
    route.pathRegex = regex
  })

  return _router
}

export const router = getRouterWithPathMatch()

console.log(router)
