import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('callback is called with right values after creating new blog', () => {
  const createBlogCB = jest.fn()

  const component = render(
    <BlogForm onSubmit={createBlogCB} />
  )

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, {
    target: { value: 'author' }
  })
  fireEvent.change(titleInput, {
    target: { value: 'title' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'url' }
  })
  fireEvent.submit(form)
  expect(createBlogCB.mock.calls[0][0]).toStrictEqual({ title: 'title', url: 'url' , author: 'author' })
})