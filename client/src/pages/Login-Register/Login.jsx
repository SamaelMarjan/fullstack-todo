import React from 'react'
import './loginRegister.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <div className='login-form'>
        <form className='container'>
          <h4 className='text-center'>Login</h4>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className='actons'>
            <p>Don't have an account? Please <Link to={'/register'}>register</Link></p>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login