import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error'>
      <h4>Desider page you are looking for is removed or not created yet.</h4>
      <p>Please back to your previous page. And try again.</p>
      <Link to={-1}>Go back</Link>
    </div>
  )
}

export default Error