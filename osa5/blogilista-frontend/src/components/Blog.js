import React, { useState } from 'react'
const Blog = ({ blog, updateHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

  const updateBlogLikes = (event) => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    updateHandler(blog)
  }
  return (
    visible
      ?
      <div style={blogStyle} className='blog'>
        <div>{blog.title} {blog.author}<button onClick={() => setVisible(false)}> hide </button></div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes}<button onClick={(event) => updateBlogLikes(event)}> like </button></div>
        <div>{blog.user.name}</div>
        <div><button onClick={() => deleteHandler(blog)}> delete </button></div>
      </div>
      :
      <div style={blogStyle} >
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}> show </button>
      </div>

  )
}

export default Blog
