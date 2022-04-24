import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import {AuthProvider} from './context/authContext'
import {ProtectedRoute} from './components/ProtectedRoute'
import {DashboardLayout} from './components/DashboardLayout';

function App() {

  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>}>
          <Route path ="/" element={
              <Home />
          } />
        </Route>
        <Route path = "/login" element = {<Login/>} />
        {/* <Route path = "/register" element = {<Register/>} /> */}
      </Routes>
      </AuthProvider>
    </div>
  )

}

export default App