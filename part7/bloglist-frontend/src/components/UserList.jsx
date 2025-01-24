import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const blogs = useSelector((state) => state.blogs)

  const userCounts = blogs.reduce((acc, blog) => {
    if (!acc[blog.user.id]) {
      acc[blog.user.id] = { username: blog.user.username, count: 0 }
    }
    acc[blog.user.id].count += 1

    return acc
  }, {})

  const userCountArray = Object.entries(userCounts)

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCountArray.map(([userId, { username, count }]) => (
              <TableRow key={userId}>
                <TableCell>
                  <Link to={`/users/${userId}`}>{username}</Link>
                </TableCell>
                <TableCell>{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
