import { authRoutes } from './auth.routes'
import { orgRoutes } from './organisation.routes'
import { userRoutes } from './user.routes'

const routes = {
  ...authRoutes,
  ...userRoutes,
  ...orgRoutes,
}

export default routes
