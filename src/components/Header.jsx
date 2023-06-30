import React from 'react'
import { Link} from 'react-router-dom'

export const Header = () => {
  
    return (
    <div className='header'>
        <h1> 
            <Link to='/'>Ecomerce</Link>
        </h1>

        <nav>
            <ul>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    </div>
  )
}
