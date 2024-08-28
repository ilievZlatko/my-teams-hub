export const orgRoutes = {
  allOrgsUrl: {
    get: '/api/v1/organizations',
  },
  createOrgUrl: {
    post: '/api/v1/organizations',
  },
  organisation: {
    delete: (organizationId: string) =>
      `/api/v1/organizations/${organizationId}`,
  },
}
