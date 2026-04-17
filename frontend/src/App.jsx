import {RouterProvider} from 'react-router-dom'
import { router } from './app.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { VideoProvider } from './features/video/video.context.jsx'
import { ThemeProvider } from './features/theme.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <VideoProvider>
        <ThemeProvider>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </VideoProvider>
    </AuthProvider>
  )
}

export default App