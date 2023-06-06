import axios from 'axios';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Create = ({handleOpen, getAllTodo}) => {
  const [input, setInput] = useState({
    title: '',
    desc: ''
  })
  const {user, token} = useSelector((state) => state.auth)

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target
    setInput({...input, [name] : value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/todo/create', input, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(data);
      if(data.success === true) {
        toast.success(data.message)
        handleOpen()
        getAllTodo()
        setInput({title: '', desc:''})
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wrong')
    }
  }
  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={input.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="desc" name='desc' value={input.desc} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create