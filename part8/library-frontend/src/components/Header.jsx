import { useApolloClient } from '@apollo/client'
import { Link } from 'react-router-dom'

const Header = ({ token, setToken }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const basicLinks = () => (
    <>
      <Link to={'/'} style={{ marginRight: 20 }}>
        Authors
      </Link>
      <Link to={'/books'} style={{ marginRight: 20 }}>
        Books
      </Link>
    </>
  )

  if (!token) {
    return (
      <div>
        {basicLinks()}
        <Link to={'/login'} style={{ marginRight: 20 }}>
          <button>Login</button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {basicLinks()}
      <Link to={'/books/add'} style={{ marginRight: 20 }}>
        Add Book
      </Link>
      <Link to={'/books/recommend'} style={{ marginRight: 20 }}>
        Recommend
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Header
