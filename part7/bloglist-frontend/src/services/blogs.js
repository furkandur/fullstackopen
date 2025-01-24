import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

const getComments = async (id) => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.get(url)
  return response.data
}

const addComment = async (id, newObject) => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, newObject)
  return response.data
}


export default {
  setToken,
  getAll,
  create,
  update,
  deleteBlog,
  getComments,
  addComment
}