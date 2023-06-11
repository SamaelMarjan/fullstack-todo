import React, { useEffect, useState } from 'react'
import './profile.css'
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {AiOutlineEdit} from 'react-icons/ai'

const Profile = ({getUser}) => {
  const {token} = useSelector((state) => state.auth)
  const [user, setUser] = useState({})
  const [selected, setSelected] = useState(null)
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({...input, [name] : value}) 
  }

  //handle select 
  const handleSelect = (field) => {
    setSelected((prevSelected) => (prevSelected === field ? null : field));
  };

  //get user
  const handleUser = async() => {
    try {
      const {data} = await axios.get('http://localhost:5000/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      setUser(data.user)
      setSelected(false)
      setInput(data.user)
    } catch (error) {
      console.log(error);
      toast.error('Something wromg')
    }
  }

  useEffect(() => {
    handleUser()
  }, [])

  //update user
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put('http://localhost:5000/auth/update', input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data);
      toast.success(data.message)
      setSelected(false)
      handleUser()
      getUser()
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }


  return (
    <div className='edit-profile'>
      <Toaster />
        <div className='container'>
            <div className='pt-5'>
              <div className='image border'>
                <img src={user?.image} alt='profileImage' />
              </div>
              <div>
                <p>
                  {selected === 'username' ? <>
                    <input type='text' name="username" value={input.username} onChange={handleChange} />
                    <button type='submit' onClick={handleUpdate}>Update</button>
                  </> : <>
                  {user?.username}
                  </> }
                  <span>
                    <AiOutlineEdit onClick={() => handleSelect('username')} />
                  </span>
                </p>
                <p>
                  {
                    selected === 'email' ? <>
                      <input type='email' name='email' value={input.email} onChange={handleChange} />
                      <button type='submit' onClick={handleUpdate}>Update</button>
                    </> : <>
                      {user?.email}
                    </>
                  }
                  <span>
                    <AiOutlineEdit onClick={() => handleSelect('email')} />
                  </span>
                </p>
                <p>
                  {
                    selected === 'password' ? <>
                    <div className='pass-input'>
                      <input type='password' name='password' value={input.password} onChange={handleChange} /> &nbsp;
                      
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                    </> : <>
                      Change Password
                    </>
                  }
                <span>
                    <AiOutlineEdit onClick={() => handleSelect('password')} />
                  </span>
                </p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile