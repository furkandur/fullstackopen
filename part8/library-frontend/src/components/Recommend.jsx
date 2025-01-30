import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useEffect } from 'react'

const Recommend = () => {
  const { data: userData, loading: userLoading } = useQuery(ME)
  const [getBooks, { data: booksData, loading: booksLoading }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userData?.me.favoriteGenre) {
      getBooks({ variables: { genre: userData?.me.favoriteGenre } })
    }
  }, [userData, getBooks])

  if (userLoading || booksLoading) {
    return <div>...loading</div>
  }

  return (
    <div>
      <h1>recommendations</h1>
      <p>
        Books in your favorite genre <strong>{userData?.me.favoriteGenre}</strong>.
      </p>
      <table style={{ width: 500 }}>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
