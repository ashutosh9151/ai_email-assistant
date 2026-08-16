import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { User } from './types'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ai-email-user')
    return saved ? JSON.parse(saved) : null
  })

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('ai-email-user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('ai-email-user')
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/*"
        element={
          user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App
