import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
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

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      sendNotification(
        `a new blog "${savedBlog.title}" added`,
        false
      )
    } catch (exception) {
      sendNotification(
        exception.response.data.error,
        true
      )
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog =>
        blog.id === id ? updatedBlog : blog
      ))
    } catch (exception) {
      sendNotification(
        exception.response.data.error,
        true
      )
    }
  }

  const deleteBlog = async id  => {
    try {
      const deletedBlog = await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      sendNotification(
        'blog successfully deleted',
        false
      )
    } catch (exception) {
      sendNotification(
        exception.response.data.error,
        true
      )
    }
  }

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
            <Togglable
              activateButtonLabel='create blog'
              deactivateButtonLabel='cancel'
              ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                user={user}
                deleteBlog={deleteBlog}
              /> )}
          </div>
      }
    </div>
  )
}

export default App