'use client'

import { SidenavKeys } from '@/enums/side-nav'

export const routes = [
  {
    image: '/assets/images/overview.svg',
    routeName: SidenavKeys.OVERVIEW,
    url: '/',
  },
  {
    image: '/assets/images/management.svg',
    routeName: SidenavKeys.TEAMS,
    url: '/teams',
  },
  {
    image: '/assets/images/users.svg',
    routeName: SidenavKeys.USERS,
    url: '/users',
  },
  {
    image: '/assets/images/organisations-chart.svg',
    routeName: SidenavKeys.ORGS,
    url: '/organizations',
  },
  // {
  //   image: '/assets/images/organisations-chart.svg',
  //   routeName: SidenavKeys.ORG_CHART,
  //   url: '/organizations/org-chart',
  // },
  {
    image: '/assets/images/evaluation.svg',
    routeName: SidenavKeys.EVALUATION,
    url: '/evaluation',
  },
  {
    image: '/assets/images/evaluation-light.svg',
    routeName: SidenavKeys.EVALUATION,
    url: '/evaluation',
  },
]
