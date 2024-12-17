import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === true) {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.match(new RegExp(filter, 'i')))
    }
  })
  
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch({
      type: 'anecdotes/voteFor',
      payload: anecdote.id
    })
    dispatch({
      type: 'notification/setNotification',
      payload: {
        message: `you voted '${anecdote.content}'`,
        error: false
      }
    })
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList