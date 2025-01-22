import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { sendNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const newBlog = action.payload
      return state.map(blog =>
        blog.id !== newBlog.id
          ? blog
          : newBlog
      )
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  },
})

export const fetchBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const saveBlog = (blogObject) => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(blogObject)
      dispatch(appendBlog(savedBlog))
      dispatch(sendNotification(`a new blog "${savedBlog.title}" added`))
    } catch (exception) {
      dispatch(sendNotification(exception.response.data.error, true))
    }
  }
}

export const deleteBlogInDb = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      dispatch(sendNotification('blog successfully deleted'))
    } catch (exception) {
      dispatch(sendNotification(exception.response.data.error, true))
    }
  }
}

export const updateBlogInDb = (id, blogObject) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(sendNotification(exception.response.data.error, true))
    }
  }
}

export const {
  appendBlog,
  setBlogs,
  updateBlog,
  removeBlog
} = blogSlice.actions

export default blogSlice.reducer