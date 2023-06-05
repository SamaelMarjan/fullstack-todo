import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import './card.css'
import { Modal } from 'antd'
import Edit from '../../pages/Create/Edit'

const Card = ({title, desc, id, created, updated}) => {
    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }
  return (
    <div>
        <div className="todo-card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <Link to={``} className="btn btn-primary">Go somewhere</Link>
            </div>
            <div className='todo-edit'>
                <FiEdit onClick={() => {handleModal()}} />
            </div>
            <div className='created-updated'>
                <span>updatedAt: {updated}</span> &nbsp;
                <span>createdAt: {created}</span>
            </div>
            <Modal open={modal} onCancel={handleModal} onOk={handleModal}>
                <Edit pid={id} />
            </Modal>
        </div>
    </div>
  )
}

export default Card