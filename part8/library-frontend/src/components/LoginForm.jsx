import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPasword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit} style={{ marginTop: 50 }}>
        <div>
          username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="text" value={password} onChange={({ target }) => setPasword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
