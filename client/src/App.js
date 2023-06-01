import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';
import Footer from './components/Footer/Footer';
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import Create from './pages/Create/Create';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<Create />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
