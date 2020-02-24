import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 0,
  id: 1,
  user: {}
}

test('renders context without likes and url by default', () => {
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).not.toHaveTextContent('url', 'likes')
})

test('renders context with likes and url after clicking button', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('title', 'likes', 'url', 'author')
})

test('clicking like button twice calls event handler twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateHandler={mockHandler}/>
  )
  const showButton = component.getByText('show')
  fireEvent.click(showButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls.length).toBe(2)
})