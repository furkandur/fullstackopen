const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  await new User({
    username: 'rootUser',
    name: 'Root',
    passwordHash: await bcrypt.hash('123', 10)
  }).save()
})

after(async () => {
  await mongoose.connection.close()
})

describe('User creation', () => {
  test('succeed with valid data', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'user1',
      name: 'foo',
      password: 'foo1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
  })

  test('fails with invalid data and responds status code 400', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'user1',
      name: 'foo',
      password: 'fo'
    }

    const apiRequest = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const errorText = apiRequest.error.text
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    console.log(errorText)
    assert(errorText.includes('password must contain'))
  })
})