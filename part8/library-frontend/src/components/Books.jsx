import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genreFilter, setGenreFilter] = useState(null)

  const { data: genresData, loading: genresLoading } = useQuery(ALL_GENRES)

  const options = genreFilter
    ? {
        variables: { genre: genreFilter },
      }
    : undefined

  const result = useQuery(ALL_BOOKS, options)

  if (result.loading || genresLoading) {
    return <div>loading...</div>
  }

  const buttonStyle = (genre) => {
    const style = genre === genreFilter ? { backgroundColor: 'lightblue' } : null
    return style
  }

  return (
    <div>
      <h2>books</h2>

      <table style={{ width: 500 }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data?.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresData?.allGenres.map((g) => (
        <button key={g} style={buttonStyle(g)} onClick={() => setGenreFilter(g)}>
          {g}
        </button>
      ))}
      <button style={buttonStyle(null)} onClick={() => setGenreFilter(null)}>
        all
      </button>
    </div>
  )
}

export default Books
