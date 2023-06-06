import React from 'react'
import './dashbord.css'
import { useSelector } from 'react-redux'
import {FcSettings} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const Dashbord = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
  return (
    <div className='dashbord'>
        <div className='container-fluid dashbord-body'>
            <div className='container mt-5 profile'>
                <div className='image border'>
                    <img src='' alt='/' />
                </div>
                <div className='profile-section'>
                    <p><span>User Name:</span>  {user?.username}</p>
                    <p><span>Email Address:</span>   {user?.email}</p>
                </div>
            </div>
            <div className='dash-setting' onClick={() => navigate('/profile')}>
                <FcSettings size={25} /> <span>Edit profile</span>
            </div>
        </div>
    </div>
  )
}

export default Dashbord