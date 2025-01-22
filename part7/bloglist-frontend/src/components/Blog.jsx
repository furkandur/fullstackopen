import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { deleteBlogInDb, updateBlogInDb } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

  /*
  const deleteButtonStyle = {
    background: 'red',
    display: user.username === blog.user.username ? '' : 'none'
  }
  */

  const blogDetails = () => {
    return (
      <div className="blogDetails">
        <span>
          <a href={blog.url}>{blog.url}</a>
        </span>
        <br />
        <span>likes: {blog.likes}</span>
        <button onClick={handleLikes}>like</button>
        <br />
        <span>{blog.user.username}</span>
        <br />
        <button onClick={handleDelete}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blogContent">
      {blog.title} - {blog.author}
      <Togglable activateButtonLabel={'view'} deactivateButtonLabel={'hide'}>
        {blogDetails()}
      </Togglable>
    </div>
  )
}

export default Blog
