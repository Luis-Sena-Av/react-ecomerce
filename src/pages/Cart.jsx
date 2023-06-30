import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice'
import { Cart_products } from '../components/Cart_products'
import '../styles/Cart_style.css'

export const Cart = () => {

    const cart=useSelector(state=>state.cart)
    const despachador=useDispatch()
    console.log(cart)
    useEffect(()=>{
        despachador(getCartThunk())
    },[])

    const precioTotal=cart.reduce((acc,cv)=>{
      const subtotal=cv.quantity*cv.product.price
      return acc + subtotal
    },0)
    
    

  return (
    <div className='cart'>

      <div>
        {cart.map(prod=>
          <Cart_products key={prod.id} produc={prod}/>
        )}
      </div>

      <div className='comprar'>
        <span>Total: <b>{precioTotal}</b></span>
        <button>Checkout</button>
      </div>

    </div>
  )
}
