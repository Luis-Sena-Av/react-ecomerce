import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk } from '../store/slices/cart.slice'
import { Cart_products } from '../components/Cart_products'
import '../styles/Cart_style.css'
import usePurchase from '../hooks/usePurchase'

export const Cart = () => {

    const cart=useSelector(state=>state.cart)
    const despachador=useDispatch()
    const {Cartpurchases}=usePurchase()

    useEffect(()=>{
      despachador(getCartThunk())
    },[])

    const handlepurchases=()=>{
      Cartpurchases()
      console.log(cart)
    }
    
    return (
      <div className='cart'>

        <div>
          {cart?.map(prod=>
            <Cart_products key={prod.id} produc={prod}/>
          )}
        </div>

        <div className='comprar'>
          <button onClick={handlepurchases}>Checkout</button>
        </div>

      </div>
    )
}
