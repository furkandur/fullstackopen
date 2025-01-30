import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.error(messages)
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const options = authors.map((a) => {
    const option = { value: a.name, label: a.name }
    return option
  })

  const editAuthorSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table style={{ width: 300 }}>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 30 }}>
        <h2>Set Birthyear</h2>
        <form onSubmit={editAuthorSubmit}>
          <Select options={options} onChange={setName} />
          <div>
            born
            <input type="number" value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
