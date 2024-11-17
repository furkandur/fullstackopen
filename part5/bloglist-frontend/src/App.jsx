import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendNotification = (message, isError) => {
    setNotification({
      message: message,
      isError: isError
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    sendNotification('Successfully logged out.', false)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            sendNotification={sendNotification}
            setBlogFormVisible={setBlogFormVisible}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notification notification={notification}/>
      {
        user === null
        ? 
        <LoginForm 
          setUser={setUser}
          sendNotification={sendNotification}
        />
        : 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </div>
        
      }
    </div>
  )
}

export default App