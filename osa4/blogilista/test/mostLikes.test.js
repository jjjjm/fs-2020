const listHelper = require('../utils/list_helper')
const testHelper = require('./test_blogs')

describe('most likes', () => {
    const listOfBlogs = testHelper.blogs
    const oneBlog = testHelper.oneBlog
    const most = testHelper.mostLikesSum

    test('of empty list returns empty object', () => {
        expect(
            listHelper.mostLikes([])
        ).toEqual({})
    })

    test('from list of one is the only author present', () => {
        expect(
            listHelper.mostLikes([oneBlog])
        ).toEqual({ author: 'Michael Chan', likes: oneBlog.likes })
    })

    test('of a list of blogs return correct object', () => {
        expect(
            listHelper.mostLikes(listOfBlogs)
        ).toEqual(most)
    })
})