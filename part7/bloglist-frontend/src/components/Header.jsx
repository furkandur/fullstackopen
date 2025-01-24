import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { AppBar, Box, Button, Toolbar } from '@mui/material'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button color="inherit" component={Link} to={'/'}>
                Home
              </Button>
              <Button color="inherit" component={Link} to={'/users'}>
                Users
              </Button>
            </Box>
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
