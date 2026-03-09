import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Profile from './Pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Auth from './Pages/Auth'
import NotFound from './Pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App