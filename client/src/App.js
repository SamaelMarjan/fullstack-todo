import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';
import Footer from './components/Footer/Footer';
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import Create from './pages/Create/Create';
import Todos from './pages/Todos/Todos';
import ForgotPass from './pages/Login-Register/ForgotPass';
import { useSelector } from 'react-redux';
import Edit from './pages/Create/Edit';

function App() {
  const {user} = useSelector((state) => state.auth)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={!user ? <Home /> : <Navigate to={'/todos'} />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<ForgotPass />} />
        <Route path='/create' element={user ? <Create /> : <Navigate to={'/login'} />} />
        <Route path='/edit/:id' element={user ? <Edit /> : <Navigate to={'/login'} />} />
        <Route path='/todos' element={user ? <Todos /> : <Navigate to={'/login'} />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
