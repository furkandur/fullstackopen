import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
    } catch (exception) {
      console.log(exception.response.data.error)
    }
  }
 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input type="text" onChange={({ target }) => setTitle(target.value)} />  
        </div>
        <div>
          author
          <input type="text" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input type="text" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm