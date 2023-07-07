import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductId } from './pages/ProductId'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Header } from './components/Header'
import { Cart } from './pages/Cart'
import { Purchases } from './pages/Purchases'
import { ProtectecRoutes } from './components/ProtectecRoutes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartThunk } from './store/slices/cart.slice'

function App() {


  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductId/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectecRoutes/>}>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
        </Route>        
      </Routes>
    </div>
  )
}

export default App
