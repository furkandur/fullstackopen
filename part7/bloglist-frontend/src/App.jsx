import { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <>
      <div>
        <h1>BlogList</h1>
        <Notification />
      </div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Header />
          <p>{user.name} logged in</p>
          <button onClick={() => dispatch(logout())}>logout</button>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BlogForm />
                  <BlogList />
                </>
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
