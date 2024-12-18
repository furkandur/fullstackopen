import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'anecdotes/createAnecdote',
      payload: content
    })

    dispatch({
      type: 'notification/setNotification',
      payload: {
        message: `'${content}' successfully created.`,
        error: false
      }
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm