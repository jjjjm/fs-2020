import React from 'react'
import PropTypes from 'prop-types'



const Login = ({ password, username, setPassword, setUsername, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

Login.propTypes = {
  password: PropTypes.string.isRequired
  , username: PropTypes.string.isRequired
  , setPassword: PropTypes.func.isRequired
  , setUsername: PropTypes.func.isRequired
  , handleLogin: PropTypes.func.isRequired
}

export default Login