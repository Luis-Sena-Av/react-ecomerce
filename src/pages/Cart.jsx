import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice'
import { Cart_products } from '../components/Cart_products'
import '../styles/Cart_style.css'
import usePurchase from '../hooks/usePurchase'

export const Cart = () => {

  const cart=useSelector(state=>state.cart)
  const despachador=useDispatch()
  const {Cartpurchases}=usePurchase()
  const [total, settotal] = useState(0)
  const IncartG=useSelector(state=>state.IncartG)

  useEffect(()=>{
    despachador(getCartThunk())
  },[IncartG])
  
  const handlepurchases=()=>{
    Cartpurchases()
    despachador(getCartThunk())
  }

useEffect(()=>{
  if(cart.length>0){
    let total_products=cart?.reduce((acc,cv)=>{
      let subt=cv.price*cv.quantity
      return acc + subt
    },0)
    settotal(total_products)
  }
},[cart])

  return (
      
    <div className='cart'>

       <div className='productos_cart'>
          {cart?.map(prod=>(            
            <Cart_products key={prod.id} produc={prod}/>
          )
          )}
      </div>          

      <div className='comprar'>
        <span className='total-cart'> <span>Total:</span> <b>$ {total.toFixed(2)}</b></span>
        <button onClick={handlepurchases}>Checkout</button>
      </div>

    </div>
  )
}
