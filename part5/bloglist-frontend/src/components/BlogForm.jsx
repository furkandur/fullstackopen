import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    createBlog(newBlog)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
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