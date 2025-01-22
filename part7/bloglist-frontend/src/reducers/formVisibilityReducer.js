import { createSlice } from '@reduxjs/toolkit'

const formVisibilitySlicer = createSlice({
  name: 'formVisibility',
  initialState: {
    blogForm: false,
    loginForm: false
  },
  reducers: {
    showForm(state, action) {
      state[action.payload] = true
    },
    hideForm(state, action) {
      state[action.payload] = false
    },
    toggleForm(state, action) {
      state[action.payload] = !state[action.payload]
    }
  }
})

export const {
  showForm,
  hideForm,
  toggleForm
} = formVisibilitySlicer.actions

export default formVisibilitySlicer.reducer