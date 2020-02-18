const listHelper = require('../utils/list_helper')
const testHelper = require('./test_blogs')

describe('favorite blog', () => {
    const listOfBlogs = testHelper.blogs
    const oneBlog = testHelper.oneBlog
    const favorite = testHelper.mostLikes

    test('of empty list returns empty object', () => {
        expect(
            listHelper.favoriteBlog([])
        ).toEqual({})
    })

    test('is the only blog present', () => {
        expect(
            listHelper.favoriteBlog([oneBlog])
        ).toEqual(oneBlog)
    })

    test('of a list is the correct blog', () => {
        expect(
            listHelper.favoriteBlog(listOfBlogs)
        ).toEqual(favorite)
    })
})