import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useSelector } from 'react-redux'

const User = ({ userId }) => {
  const blogs = useSelector((state) => state.blogs)
  const filteredBlogs = blogs.filter((blog) => blog.user.id === userId)

  if (!filteredBlogs || filteredBlogs.length < 1) {
    return (
      <div>
        <Typography variant="subtitle2" color="error">
          user not found
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h3">{filteredBlogs[0].user.username}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Added Blogs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
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

export default User
