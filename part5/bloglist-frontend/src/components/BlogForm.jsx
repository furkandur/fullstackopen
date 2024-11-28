import { useState } from 'react'
import PropTypes from 'prop-types'

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
          <input
            type="text"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
            data-testid='title'
          />
        </div>
        <div>
          author
          <input
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
            data-testid='author'
          />
        </div>
        <div>
          url
          <input
            type="text"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
            data-testid='url'
          />
        </div>
        <button type="submit" data-testid='blog-submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm