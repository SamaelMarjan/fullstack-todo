import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const profileRef = useRef(null);
  const navigate = useNavigate()

  const handleOpen = () => {
    setClick(!click)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target) && !event.target.classList.contains('modal-link')) {
        setClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand text-light" to={'/'}>MERN - TODO</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-light">
            <li className="nav-item">
              <NavLink className="nav-link  text-light" to={'/'}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link  text-light" to={'/register'}>Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link  text-light" to={'/login'}>Login</NavLink>
            </li>
            <li className="nav-item" ref={profileRef}>
              <NavLink className="nav-link  text-light" onClick={handleOpen}>Samael</NavLink>
            </li>
            {
              click && 
              <div className='modal-style' onClick={handleOpen}>
                <ul>
                  <li>
                    <Link to={'/dashbord'} className='modal-link'>Dashbord</Link>
                  </li>
                  <li>
                    <Link to={'/profile'} className='modal-link'>Profile</Link>
                  </li>
                  <li>
                    <NavLink to={'/create'} className='modal-link'>Create</NavLink>
                  </li>
                </ul>
              </div>
            }
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar