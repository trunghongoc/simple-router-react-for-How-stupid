import { lazy } from 'react'

import { ROUTER_NAME } from './name'

export const firstRoute = {
  name: ROUTER_NAME.HOME,
  path: '/',
  component: lazy(() => import('./../page/Home'))
}

export const router = [
  {
    name: ROUTER_NAME.HOME,
    path: '/',
    component: lazy(() => import('./../page/Home'))
  },
  {
    name: ROUTER_NAME.REMEDIAL_ACTION_RESPONSE,
    path: '/remedial-action-response',
    component: lazy(() => import('./../page/RemedialActionResponse'))
  }
]
