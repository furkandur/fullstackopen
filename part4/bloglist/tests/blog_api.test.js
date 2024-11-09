const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

after(async () => {
  await mongoose.connection.close()
})

test('should returns the correct amount of blog posts in the JSON', async () => {
  const response = await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('should unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const propertyNames = Object.keys(response.body[0])

  assert(!propertyNames.includes('_id'))
  assert(propertyNames.includes('id'))
})

test('should successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'New Blog For Test',
    author: 'Someone',
    url: 'https://www.google.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  console.log(contents)
  assert(contents.includes('New Blog For Test'))
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Missing Like Property',
    url: 'https://www.google.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd[helper.initialBlogs.length]

  assert.strictEqual(addedBlog.likes, 0)
})

test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    title: 'No URL Blog',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('should delete a single blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const firstBlogId = blogsAtStart[0].id

  await api
    .delete(`/api/blogs/${firstBlogId}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length + 1)
})

test('should update the number of likes for a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const firstBlogAtStart = blogsAtStart[0]

  await api
    .put(`/api/blogs/${firstBlogAtStart.id}`)
    .send({ likes: 66 })

  const blogsAtEnd = await helper.blogsInDb()
  const blogAtEnd = blogsAtEnd.find(blog => blog.id === firstBlogAtStart.id)

  assert.strictEqual(blogAtEnd.likes, 66)
})