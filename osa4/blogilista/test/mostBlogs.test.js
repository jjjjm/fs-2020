const listHelper = require('../utils/list_helper')
const testHelper = require('./test_blogs')

describe('most blogs', () => {
    const listOfBlogs = testHelper.blogs
    const oneBlog = testHelper.oneBlog
    const most = testHelper.mostBlogs

    test('of empty list returns empty object', () => {
        expect(
            listHelper.mostBlogs([])
        ).toEqual({})
    })

    test('from list of one is the only author present', () => {
        expect(
            listHelper.mostBlogs([oneBlog])
        ).toEqual({ author: 'Michael Chan', blogs: 1 })
    })

    test('of a list of blogs return correct object', () => {
        expect(
            listHelper.mostBlogs(listOfBlogs)
        ).toEqual(most)
    })
})