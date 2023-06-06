import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Create from '../Create/Create'
import {IoAddOutline} from 'react-icons/io5'
import {Modal} from 'antd'
import './todos.css'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Dashbord from '../Dashbord/Dashbord'

const Todos = () => {
  const [modal, setModal] = useState(false)
  const [todo, setTodo] = useState([])
  const {user, token} = useSelector((state) => state.auth)
  const handleOpen = () => {
    setModal(!modal)
  }

  //get all todo
  const getAllTodo = async() => {
    try {
      const {data} = await axios.get('http://localhost:5000/todo/mytodo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data.todo);
      // Sort todos by createdAt in descending order
      const sortedTodos = data.todo.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) || new Date(b.createdAt) - new Date(a.createdAt));
      setTodo(sortedTodos)
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  useEffect(() => {
    getAllTodo()
  }, [])
  
  return (
    <div className='container-fluid mt-5 mb-3 todos'>
        <Toaster />
        <Dashbord />
        <div className='container'>
        <div className='todos-btn btn border mt-5' onClick={handleOpen}>
          <span>Add</span>
          <IoAddOutline size={25} />
        </div>
        </div>
        <Modal open={modal} onCancel={handleOpen} onOk={handleOpen}>
          <Create handleOpen={handleOpen} getAllTodo={getAllTodo} />
        </Modal>
        <div className='container mt-5'>
          {
            todo && todo?.length > 0 ? 
            todo.map((todo) => (
              <div key={todo._id} >
                <div className='card mb-5'>
                  <Card getAllTodo={getAllTodo} title={todo?.title} desc={todo?.desc} id={todo._id} created={todo.createdAt} updated={todo.updatedAt} />
                </div>
              </div>
            )) : <>No todo</>
          }
        </div>
    </div>
  )
}

export default Todos