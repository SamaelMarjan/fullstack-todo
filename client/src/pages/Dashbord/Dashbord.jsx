import React from 'react'
import './dashbord.css'
import { useSelector } from 'react-redux'

const Dashbord = () => {
    const {user} = useSelector((state) => state.auth)
  return (
    <div className='dashbord'>
        <div className='container-fluid'>
            <div className='container mt-5 profile'>
                <div className='image border'>
                    <img src='' alt='/' />
                </div>
                <div className='profile-section'>
                    <p><span>User Name:</span>  {user?.username}</p>
                    <p><span>Email Address:</span>   {user?.email}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashbord