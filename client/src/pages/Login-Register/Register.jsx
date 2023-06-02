import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'
import './loginRegister.css'

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  //create user
  const handleRegister = async(e) => {
    e.preventDefault()
    try {
      const {password, confirmpassword} = input
      if(confirmpassword !== password) {
        toast.error('Password and confirm password not matched')
      } else {
        const {data} = await axios.post('http://localhost:5000/auth/register', input)
        console.log(data);
        if(data.success !== true) {
          toast.error(data.message)
        } else {
          toast.success(data.message)
          navigate('/login')
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='register'>
      <Toaster />
      <div className='register-form'>
        <form className='container' onSubmit={handleRegister}>
          <h4 className='text-center'>Register</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="text" className="form-control" id="name" name='username' value={input.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={input.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={input.password} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name='confirmpassword' value={input.confirmpassword} onChange={handleChange} />
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