const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

test('cant create user without username or password', async () => {
    const userWithoutPassword = {
        name: "name",
        username: "name"
    }
    const userWithTooShrtPassword = {
        name: "name",
        username: "name",
        password: "1"
    }
    
    const userWithoutUsername = {
        name: "name",
        password: "123456789"
    }
    
    await api
      .post('/api/users')
      .send(userWithoutPassword)
      .expect(400)

      await api
      .post('/api/users')
      .send(userWithTooShrtPassword)
      .expect(400)

      await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400)
  })

afterAll(() => {
    mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
})