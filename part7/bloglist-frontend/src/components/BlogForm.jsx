import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideForm, toggleForm } from '../reducers/formVisibilityReducer'
import { saveBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const isFormVisible = useSelector((state) => state.formVisibility.blogForm)

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    dispatch(saveBlog(newBlog))
    dispatch(hideForm('blogForm'))
  }

  return (
    <div>
      {isFormVisible && (
        <div>
          <h2>Create a new blog</h2>
          <form onSubmit={handleCreateBlog}>
            <div>
              title
              <input
                type="text"
                onChange={({ target }) => setTitle(target.value)}
                placeholder="title"
                data-testid="title"
              />
            </div>
            <div>
              author
              <input
                type="text"
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="author"
                data-testid="author"
              />
            </div>
            <div>
              url
              <input
                type="text"
                onChange={({ target }) => setUrl(target.value)}
                placeholder="url"
                data-testid="url"
              />
            </div>
            <button type="submit" data-testid="blog-submit">
              create
            </button>
          </form>
        </div>
      )}
      <button onClick={() => dispatch(toggleForm('blogForm'))}>
        {isFormVisible ? 'cancel' : 'create blog'}
      </button>
    </div>
  )
}

export default BlogForm
