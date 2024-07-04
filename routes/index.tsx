export const routes = [
  {
    image: '/assets/images/overview.svg',
    routeName: 'Overview',
    url: '/',
  },
  {
    image: '/assets/images/management.svg',
    routeName: 'Management',
    subRoutes: [
      { routeName: 'Organisation’s chart' },
      {
        routeName: 'Teams',
        subRoutes: [
          { routeName: 'View All Teams' },
          { routeName: 'Add Team' },
          { routeName: 'Edit Team' },
        ],
      },
      {
        routeName: 'Users',
        subRoutes: [
          { routeName: 'View All Users' },
          { routeName: 'Add User' },
          { routeName: 'Edit User' },
        ],
      },
    ],
  },
  {
    image: '/assets/images/evaluation.svg',
    routeName: 'Evaluation',
    url: '/evaluation',
  },
]
