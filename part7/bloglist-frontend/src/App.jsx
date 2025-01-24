import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { Route, Routes, useMatch } from 'react-router-dom'

import Header from './components/Header'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const userId = userMatch ? userMatch.params.id : undefined

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : undefined

  return (
    <Container>
      <div>
        <Notification />
      </div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Header />
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
            <Route path="/blogs/:id" element={<BlogDetails blog={blog} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User userId={userId} />} />
          </Routes>
        </div>
      )}
    </Container>
  )
}

export default App
