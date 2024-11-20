import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = () => {
    return(
      <div>
        {blog.url} 
        <br />
        likes: {blog.likes}
        <button>like</button>
        <br />
        {blog.user.username}
      </div>
    )
  }

  return(
    <div style={blogStyle}>
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

export default Blog