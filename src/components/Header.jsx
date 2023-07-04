import React from 'react'
import { Link} from 'react-router-dom'
import "../styles/header_style.css"

export const Header = () => {
  
    return (
    <div className='header'>
        <h1> 
            <Link to='/'>Ecomerce</Link>
        </h1>

        <nav>
            <ul>
                <li><Link to='/register'>Register <i className='bx bx-user-plus'></i></Link></li>
                <li><Link to='/login'>Login <i className='bx bx-log-in'></i></Link></li>
                <li><Link to='/cart'><i className='bx bx-cart-alt' ></i></Link></li>
                <li><Link to='/purchases'><i className='bx bx-receipt'></i></Link></li>
            </ul>
        </nav>
    </div>
  )
}
