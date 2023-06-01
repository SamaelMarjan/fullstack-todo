import React from 'react'
import {Link} from 'react-router-dom'
import './loginRegister.css'

const Register = () => {
  return (
    <div className='register'>
      <div className='register-form'>
        <form className='container'>
          <h4 className='text-center'>Register</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className='actons'>
            <p>Already have an account? Please <Link to={'/login'}>login</Link></p>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register