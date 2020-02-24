import React from 'react'

const Error = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div className='error' style={errorStyle}>{message}</div>
  )
}

export default Error