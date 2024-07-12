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
          { routeName: 'View All Teams', url: '/teams' },
          {
            routeName: 'Add Team',
            url: '/teams/create',
          },

          //TODO: Is this going to stay?
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
          { routeName: 'Edit User', url: '/users/{userId}' },
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
