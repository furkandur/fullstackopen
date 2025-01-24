import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Box marginTop={5}>
        <Typography variant="h3">LOGIN TO APP</Typography>
        <form onSubmit={handleLogin}>
          <Stack gap={2}>
            <TextField
              type="text"
              label="Username"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="contained" type="submit" data-testid="login">
              login
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  )
}

export default LoginForm
