import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === true) {
      return state.anecdotes
    } else {
      return state.anecdotes
        .filter(anecdote => anecdote.content.match(new RegExp(state.filter, 'i')))
    }
  })
  
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList