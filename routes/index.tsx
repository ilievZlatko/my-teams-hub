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
      { routeName: 'Organisation’s chart', url: '/organizations' },
      {
        routeName: 'Teams',
        subRoutes: [
          { routeName: 'View All Teams', url: '/organizations' },
          {
            routeName: 'Add Team',
            url: '/organization/{organizationsId}/teams',
          },
          {
            routeName: 'Edit Team',
            url: '/organizations/{organizationsId}/teams/{teamId}',
          },
        ],
      },
      {
        routeName: 'Users',
        subRoutes: [
          { routeName: 'View All Users', url: '/users' },
          { routeName: 'Add User', url: '/users' },
          { routeName: 'Edit User', url: '/users' },
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
