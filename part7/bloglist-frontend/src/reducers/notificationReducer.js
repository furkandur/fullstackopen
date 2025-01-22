import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state,action) {
      return null
    }
  }
})

export const sendNotification = (msg, isError = false, second = 5) => {
  const notification = {
    message: msg,
    isError: isError
  }

  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000 )
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer