import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from './store/slices/productos.slice'
import { ProductId } from './pages/ProductId'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Header } from './components/Header'

function App() {
  
  const despachador=useDispatch()

  useEffect(()=>{
    despachador(getAllProductsThunk())
  },[])

  

  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductId/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
