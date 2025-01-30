import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  return (
    <>
      <Header setToken={setToken} token={token} />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute token={token}>
              <NewBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/recommend"
          element={
            <ProtectedRoute token={token}>
              <Recommend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute token={!token}>
              <LoginForm setToken={setToken} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
