import axios from 'axios'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPass = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: '',
    newPass: '',
    confirmPass: ''
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  const handleForgot = async(e) => {
    e.preventDefault()
    try {
      const {newPass, confirmPass} = input
      if(confirmPass !== newPass) {
        toast.error('Confirm password and password sould be same')
      } else {
        const {data} = await axios.post('http://localhost:5000/auth/reset', input)
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
    <div className='forgot'>
      <Toaster />
      <div className='forgot-form'>
        <form className='container' onSubmit={handleForgot}>
          <h4 className='text-center'>Login</h4>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={input.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input type="password" className="form-control" id="password" name='newPass' value={input.newPass} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="password" name='confirmPass' value={input.confirmPass} onChange={handleChange} />
          </div>
          <div className='forgot-actons'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPass