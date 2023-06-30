import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCartThunk } from '../store/slices/cart.slice'

export const Cart_products = ({produc}) => {

    const [quantity, setquantity] = useState(1)

    const despachador=useDispatch()

    const handleConta=e=>{
        if(e.target.classList.contains("bx-plus")){
            setquantity(quantity+1)
        }
        if(e.target.classList.contains("bx-minus")){
            if(quantity>=2){
                setquantity(quantity-1)
            }        
        }
    }

    const handleDelete=()=>{
        despachador(deleteCartThunk(produc))
    }


  return (
    
    <div className='pro_cart'>
       
        <div className='img_product'>
            <img src={produc.product.images[0].url} alt="produc_img" />
        </div>

        <div>
            <h2>{produc.product.title} <i onClick={handleDelete} className='bx bx-trash'></i></h2>
            <div className='totals'>
                <span>Units: <b>{produc.quantity}</b></span>
                <span>Price unit: <b>{produc.product.price}</b> </span>
                <span>Subtotal: <b>${produc.product.price*produc.quantity}</b></span>
            </div>
            <div className='contador' onClick={handleConta}>
                <span className='conta'><i className='bx bx-minus'></i></span>
                <span className='conta'>{produc.quantity}</span>
                <span className='conta'><i className='bx bx-plus'></i></span>
            </div>  
            
        </div>

      

        
    </div>
  )
}
