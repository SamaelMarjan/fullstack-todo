import React, { useState } from 'react'
import './loginRegister.css'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {login} from '../../redux/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  //login
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/auth/login', input)
      console.log(data);
      if(data.success !== true) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
        dispatch(login(data))
        navigate('/todos')
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }

  return (
    <div className='login'>
      <Toaster />
      <div className='login-form'>
        <form className='container' onSubmit={handleLogin}>
          <h4 className='text-center'>Login</h4>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={input.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={input.password} onChange={handleChange} />
          </div>
          <div className='login-actons'>
            <p>Don't have an account? Please <Link to={'/register'}>register</Link></p>
            <p>Forgot password? Click <Link to='/forgot'>here</Link> to reset password</p>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login