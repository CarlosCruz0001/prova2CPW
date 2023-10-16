import { RouteObject } from 'react-router-dom'
import Home from './pages/Home'
import PhotoView from './pages/PhotoView'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/view',
    element: <PhotoView />,
  },
]

export default routes
