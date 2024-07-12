"use client";

export enum SidenavKeys {
  OVERVIEW = 'overview',
  TEAMS = 'teams',
  USERS = 'users',
  ORG_CHART = 'org-chart',
  EVALUATION = 'evaluation'
}

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
    routeName: SidenavKeys.ORG_CHART,
    url: '/organisations',
  },
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
];


