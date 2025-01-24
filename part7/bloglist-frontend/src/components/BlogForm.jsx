import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideForm, toggleForm } from '../reducers/formVisibilityReducer'
import { saveBlog } from '../reducers/blogReducer'
import { Button, Stack, TextField, Typography } from '@mui/material'

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
          <Typography variant="h5" align="center">
            Create A New Blog
          </Typography>
          <form onSubmit={handleCreateBlog}>
            <Stack gap={1}>
              <TextField
                type="text"
                label="title"
                onChange={({ target }) => setTitle(target.value)}
                data-testid="title"
              />
              <TextField
                type="text"
                label="author"
                onChange={({ target }) => setAuthor(target.value)}
                data-testid="author"
              />
              <TextField
                type="text"
                label="url"
                onChange={({ target }) => setUrl(target.value)}
                data-testid="url"
              />
              <Button
                type="submit"
                variant="contained"
                data-testid="blog-submit"
              >
                create
              </Button>
            </Stack>
          </form>
        </div>
      )}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => dispatch(toggleForm('blogForm'))}
        sx={{ mt: 1 }}
      >
        {isFormVisible ? 'cancel' : 'create blog'}
      </Button>
    </div>
  )
}

export default BlogForm
