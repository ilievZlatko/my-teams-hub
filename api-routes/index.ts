import { authRoutes } from './auth.routes'
import { orgRoutes } from './organisation.routes'
import { teamRoutes } from './teams.routes'
import { userRoutes } from './user.routes'

const routes = {
  ...authRoutes,
  ...userRoutes,
  ...orgRoutes,
  ...teamRoutes,
}

export default routes
