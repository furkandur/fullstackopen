import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  deleteBlogInDb,
  updateBlogInDb
} from '../reducers/blogReducer'
import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { ThumbUp } from '@mui/icons-material'

const BlogDetails = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  if (!blog) {
    return null
  }

  const handleLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    dispatch(updateBlogInDb(blog.id, updatedBlog))
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlogInDb(blog.id))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment
    }

    dispatch(addComment(blog.id, newComment))
    setComment('')
  }

  const deleteButtonSx = {
    display: user.username === blog.user.username ? '' : 'none'
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {blog.author}
          </Typography>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            added by {blog.user.username}
          </Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton color="primary" onClick={handleLikes}>
              <ThumbUp />
            </IconButton>
            <Typography>{blog.likes}</Typography>
          </Stack>
          <Button size="small" href={blog.url}>
            Go to Blog
          </Button>
          <Button sx={deleteButtonSx} color="error" onClick={handleDelete}>
            remove
          </Button>
          <Divider />
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction={'row'} spacing={2}>
              <TextField
                type="text"
                label="Comment"
                placeholder="Write a comment"
                maxRows={3}
                multiline
                fullWidth
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
              <Button variant="outlined" type="submit">
                Send
              </Button>
            </Stack>
          </form>
          <TableContainer>
            <Table>
              <TableBody>
                {blog.comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>{comment.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails
