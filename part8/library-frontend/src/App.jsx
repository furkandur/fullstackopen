import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <div>
        <Link to={'/'} style={{ marginRight: 20 }}>
          Authors
        </Link>
        <Link to={'/books'} style={{ marginRight: 20 }}>
          Books
        </Link>
        <Link to={'/books/add'} style={{ marginRight: 20 }}>
          Add Book
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
      </Routes>
    </>
  )
}

export default App
