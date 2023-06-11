import React, { useEffect, useState } from 'react'
import './dashbord.css'
import { useSelector } from 'react-redux'
import {FcSettings} from 'react-icons/fc'
//import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import Profile from '../Profile/Profile'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Dashbord = () => {
    //const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)
    const [user, setUser] = useState({})
    const [modal, setModal] = useState(false)

    const openMdal = () => {
        setModal(!modal)
    }

    const getUser = async() => {
        try {
            const {data} = await axios('http://localhost:5000/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            setUser(data.user)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getUser()
    }, [])
  return (
    <div className='dashbord'>
        <div className='container-fluid dashbord-body'>
            <div className='container mt-5 profile'>
                <div className='image border'>
                    <img src={user?.image} alt='profileimage' />
                </div>
                <div className='profile-section'>
                    <p><span>User Name:</span>  {user?.username}</p>
                    <p><span>Email Address:</span>   {user?.email}</p>
                </div>
            </div>
            <div className='dash-setting' onClick={openMdal}>
                <FcSettings size={25} /> <span>Edit profile</span>
            </div>
            <Modal open={modal} onCancel={openMdal}>
                <Profile getUser={getUser} />
            </Modal>
        </div>
    </div>
  )
}

export default Dashbord