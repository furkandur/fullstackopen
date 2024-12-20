import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== newAnecdote.id
        ? anecdote
        : newAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  updateAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnectode = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnectode))
  }
}

export const voteForAnecdote = (anecdote) => {
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch(updateAnecdote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer