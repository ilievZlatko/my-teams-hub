import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes'

const routes = {
  ...authRoutes,
  ...userRoutes,
}

export default routes
