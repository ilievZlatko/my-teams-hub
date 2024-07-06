export const teamRoutes = {
  allTeamsUrl: {
    get: '/teams',
  },
  createTeamUrl: {
    post: '/teams',
  },
  updateTeamUrl: {
    patch: '/teams',
  },

  // Routes with parameters for all CRUD operations for a team
  team: {
    get: (organizationId: string) =>
      `/api/v1/organizations/${organizationId}/teams`,

    getOne: (organizationId: string, teamId: string) =>
      `/api/v1/organizations/${organizationId}/teams/${teamId}`,

    post: (organizationId: string) =>
      `/api/v1/organizations/${organizationId}/teams`,

    patch: (organizationId: string, teamId: string) =>
      `/api/v1/organizations/${organizationId}/teams/${teamId}`,

    delete: (organizationId: string, teamId: string) =>
      `/api/v1/organizations/${organizationId}/teams/${teamId}`,
  },
}
