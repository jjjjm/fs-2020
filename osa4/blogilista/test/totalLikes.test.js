const listHelper = require('../utils/list_helper')
const testHelper = require('./test_blogs')

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('when has only one blog is equal to the likes of that', () => {
        const result = listHelper.totalLikes([testHelper.oneBlog])
        expect(result).toBe(testHelper.oneBlog.likes)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testHelper.blogs)
        expect(result).toBe(testHelper.totalLikes)
    })
})