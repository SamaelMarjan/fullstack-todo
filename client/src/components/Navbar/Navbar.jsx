import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import {AiOutlineMenu} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { Modal } from 'antd'
import Create from '../../pages/Create/Create'

const Navbar = () => {
  const dispatch = useDispatch()
  const [click, setClick] = useState(false)
  const [modal, setModal] = useState(false)
  const profileRef = useRef(null);
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  const handleOpen = () => {
    setClick(!click)
  }

  const handleOpenModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && 
        !profileRef.current.contains(event.target) && 
        !event.target.classList.contains('modal-link')) {
        setClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout())
  }
    
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className=" text-light" style={{color: '#fff'}} >
            <AiOutlineMenu />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand text-light" to={'/'}>MERN - TODO</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-light">
            {user ? <>
              <li className="nav-item">
                <NavLink className="nav-link  text-light" to={'/todos'}>Todos</NavLink>
              </li>
              <li className="nav-item" ref={profileRef}>
                <NavLink className="nav-link  text-light" onClick={handleOpen}>{user?.username}</NavLink>
              </li>
            </> : <>
              <li className="nav-item">
                <NavLink className="nav-link  text-light" to={'/'}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  text-light" to={'/register'}>Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  text-light" to={'/login'}>Login</NavLink>
              </li>
              
            </>}
            
            {
              click && 
              <div className='modal-style' onClick={handleOpen}>
                <ul>
                  <li>
                    <Link to={'/profile'} className='modal-link'>Profile</Link>
                  </li>
                  <li>
                    <Link to={'/dashbord'} className='modal-link'>Dashbord</Link>
                  </li>
                  <li onClick={handleOpenModal}>
                    <NavLink className='modal-link'>Create</NavLink>
                  </li>
                  <li>
                    <NavLink className='modal-link' onClick={handleLogout}>Logout</NavLink>
                  </li>
                </ul>
                
              </div>
            }
                  <Modal open={modal} onCancel={handleOpenModal} onOk={handleOpenModal} >
                    <Create />
                  </Modal>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar