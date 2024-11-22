const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const blogUser = {
  username: 'blogUser',
  name: 'Blog',
  password: 'blog123'
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const newUser = new User({
    username: blogUser.username,
    name: blogUser.name,
    passwordHash: await bcrypt.hash(blogUser.password, 10),
  })

  const savedUser = await newUser.save()

  const blogObjects = helper
    .initialBlogs
    .map(blog => new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: savedUser._id
    }))

  for (const blog of blogObjects) {
    const savedBlog = await blog.save()
    savedUser.blogs = savedUser.blogs.concat(savedBlog._id)
  }

  await savedUser.save()
})

after(async () => {
  await mongoose.connection.close()
})

describe('getting blogs', () => {
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
})

const getToken = async (user) => {
  const loginUser = await api
    .post('/api/login')
    .send(user)

  return await loginUser.body.token
}

describe('creating blogs', () => {
  test('should successfully creates a new blog post', async () => {
    const token = await getToken(blogUser)
    const newBlog = {
      title: 'New Blog For Test',
      author: 'Someone',
      url: 'https://www.google.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
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

    const token = await getToken(blogUser)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
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

    const token = await getToken(blogUser)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'New Blog For Test',
      author: 'Someone',
      url: 'https://www.google.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deleting blogs', () => {
  test('should delete a single blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogId = blogsAtStart[0].id

    const token = await getToken(blogUser)
    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length + 1)
  })
})

describe('updating blogs', () => {
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
})
