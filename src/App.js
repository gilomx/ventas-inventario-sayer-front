import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import {AuthProvider} from './context/authContext'
import {ProtectedRoute} from './components/ProtectedRoute'

function App() {

  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path ="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path = "/login" element = {<Login/>} />
        {/* <Route path = "/register" element = {<Register/>} /> */}
      </Routes>
      </AuthProvider>
    </div>
  )

}

export default App