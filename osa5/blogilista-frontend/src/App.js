import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

import Error from './components/Error'
import Success from './components/Success'

import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username, password)
    } catch (exception) {
      notificationSetter(<Error message={'Wrong credentials'} />)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const newBlogHandler = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      notificationSetter(<Success message={`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`} />)
    } catch (exception) {
      notificationSetter(<Error message={exception.message} />)
    }
  }

  const blogUpdateHandler = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update({ ...updatedBlog, user: user.id })
      notificationSetter(<Success message={`liked blog ${returnedBlog.title}`} />)
    } catch (exception) {
      notificationSetter(<Error message={exception.message} />)
    }
  }

  const blogDeleteHandler = async (deletedBlog) => {
    try {
      if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author} ?`)) {
        await blogService.remove(deletedBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
        notificationSetter(<Success message={`deleted ${deletedBlog.title}`} />)
      }
    } catch (exception) {
      notificationSetter(<Error message={exception.message} />)
    }
  }

  const notificationSetter = (notification) => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 5000)
  }



  if (user === null) {
    return (
      <div>
        <h1>Blog app</h1>
        {notification !== null && notification}
        <Login username={username} password={password} setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>{'blogs'}</h2>
        {notification !== null && notification}
        <div>{`logged in as ${user.username}`} <button onClick={() => logoutHandler()}>{'logout'}</button></div>
        <h2>{'create new'}</h2>
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm onSubmit={newBlogHandler} />
        </Togglable>
        <div>
          {blogs
            .filter(blog => blog.user.username === user.username)
            .sort((first, second) => second.likes - first.likes)
            .map(blog => {
              return (
                <Blog key={blog.id} blog={blog} updateHandler={blogUpdateHandler} deleteHandler={blogDeleteHandler} />
              )
            })
          }
        </div>
      </div >
    )

  }
}

export default App