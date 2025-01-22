import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  const userBlogCounts = blogs.reduce((acc, blog) => {
    acc[blog.user.username] = (acc[blog.user.username] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userBlogCounts).map(([user, count]) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
