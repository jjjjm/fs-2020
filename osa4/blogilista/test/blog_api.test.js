const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testData = require('./test_blogs')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returner from db', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(testData.blogs.length)
})

test('field id is defined for blogs returned from db', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('blogs can be added to db', async() => {
    const blog = {
        title: "new title",
        author: "author",
        url: "url.com",
        likes: 10
    }
    const savedBlog = await api.post('/api/blogs').send(blog)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(testData.blogs.length + 1)
    expect(savedBlog.body).toEqual({...blog, id: savedBlog.body.id})
})

test('blog that dont have field likes get set to 0', async() => {
    const blog = {
        title: "new title",
        author: "author",
        url: "url.com"
    }
    const response = await api.post('/api/blogs').send(blog)
    expect(response.body.likes).toBe(0)
})

test('saving blogs without fields title or url returns 400', async() => {
    const blogWithoutTitle = {
        author: "author",
        url: "url.com",
        likes: 10
    }
    const blogWithoutUrl = {
        title: "new title",
        author: "author",
        likes: 10
    }
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const initialBlogObjects = testData.blogs.map(blog => new Blog(blog))
    const promises = initialBlogObjects.map(blog => blog.save())
    await Promise.all(promises)
})