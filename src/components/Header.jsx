import React from 'react'
import { Link} from 'react-router-dom'
import "../styles/header_style.css"
import { useDispatch, useSelector } from 'react-redux'
import { setmostrarCartG } from '../store/slices/mostrarCart.slice'

export const Header = () => {

    const despachador=useDispatch()
    const mostrarCartG=useSelector(state=>state.mostrarCartG)

    const handleMostrar=()=>{
        despachador(setmostrarCartG(!mostrarCartG))
    }

    return (
    <div className='header'>
        <h1> 
            <Link to='/' className='ecomer' >Ecomerce</Link>
        </h1>

        <nav>
            <ul>
                <li><Link to='/register'><i className='bx bx-user-plus'></i></Link></li>
                <li><Link to='/login'><i className='bx bx-log-in'></i></Link></li>
                <li><Link><i onClick={handleMostrar} className='bx bx-cart-alt' ></i></Link></li>
                <li><Link to='/purchases'><i className='bx bx-receipt'></i></Link></li>
            </ul>
        </nav>
    </div>
  )
}
