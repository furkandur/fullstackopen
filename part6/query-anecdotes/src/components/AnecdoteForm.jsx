import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const {sendNotification} = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      sendNotification(`anecdote '${newAnecdote.content}' is created`)
    },
    onError: (error) => {
      const errorMsg = error.response.data.error
      sendNotification(errorMsg, true)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    /*
    useNotificationDispatch({
      type: 'SET',
      payload: { message: `${content} added.` }
    })
    */
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
