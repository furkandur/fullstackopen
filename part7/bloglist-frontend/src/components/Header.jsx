import { Link } from 'react-router-dom'

const Header = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <header>
      <Link style={padding} to={'/'}>
        Home
      </Link>
      <Link style={padding} to={'users'}>
        Users
      </Link>
    </header>
  )
}

export default Header
