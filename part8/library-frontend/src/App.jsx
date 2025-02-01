import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqById = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data?.bookAdded
      window.alert(`The book "${addedBook.title}" added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  return (
    <>
      <Header setToken={setToken} token={token} />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute token={token}>
              <NewBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/recommend"
          element={
            <ProtectedRoute token={token}>
              <Recommend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute token={!token}>
              <LoginForm setToken={setToken} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
