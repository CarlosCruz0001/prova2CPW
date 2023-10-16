import { useRoutes } from 'react-router-dom'

import routes from './routes'
import { UserContextProvider } from './context/UserContext'

const App = () => {
  // useEffect(() => {
  //   searchPhotos('cat', 'relevant', 1)
  // }, [])

  const elements = useRoutes(routes)

  return <UserContextProvider>{elements}</UserContextProvider>
}

export default App
