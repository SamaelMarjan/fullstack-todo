import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import './card.css'
import { Modal } from 'antd'
import Edit from '../../pages/Create/Edit'
import moment from 'moment'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Card = ({title, desc, id, created, updated, getAllTodo}) => {
    const {user, token} = useSelector((state) => state.auth)
    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }

    //delete function
    const handleDelete = async() => {
        try {
            const {data} = await axios.delete(`http://localhost:5000/todo/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            toast.success(data.message)
            getAllTodo()
        } catch (error) {
            console.log(error);
            toast.error('Something wrong')
        }
    }
  return (
    <div>
        <Toaster />
        <div className="todo-card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <Link to={``} className="btn btn-primary">Go somewhere</Link>
            </div>
            <div className='todo-edit'>
                <FiEdit  onClick={handleModal} />
                <AiFillDelete size={20} onClick={handleDelete} />
            </div>
            <div className='created-updated'>
                <span>updatedAt: {moment(updated).format('YYYY-MM-DD')}</span> &nbsp;
                <span>createdAt: {moment(created).format('YYYY-MM-DD')}</span>
            </div>
            <Modal open={modal} onCancel={handleModal} onOk={handleModal}>
                <Edit pid={id} handleModal={handleModal} getAllTodo={getAllTodo} />
            </Modal>
        </div>
    </div>
  )
}

export default Card