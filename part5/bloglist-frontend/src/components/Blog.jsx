import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const newBlogUpdate = {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
      'user': blog.user.id,
    }
    updateBlog(blog.id, newBlogUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const deleteButtonStyle = {
    background: 'red',
    display: user.username === blog.user.username
      ? ''
      : 'none'
  }

  const blogDetails = () => {
    return (
      <div className='blogDetails'>
        <span><a href={blog.url}>{blog.url}</a></span>
        <br />
        <span>likes: {blog.likes}</span>
        <button onClick={handleLikes}>like</button>
        <br />
        <span>{blog.user.username}</span>
        <br />
        <button style={deleteButtonStyle} onClick={handleDelete}>remove</button>
      </div>
    )
  }

  return(
    <div style={blogStyle} className='blogContent'>
      {blog.title} - {blog.author}
      <Togglable
        activateButtonLabel={'view'}
        deactivateButtonLabel={'hide'}
      >
        {blogDetails()}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog