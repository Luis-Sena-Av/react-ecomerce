import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartThunk, updateCartThunk } from '../store/slices/cart.slice'
import '../styles/Cart_style.css'
export const Cart_products = ({produc}) => {

    const [quantity, setquantity] = useState(produc.quantity)
    const despachador=useDispatch()
    const IncartG=useSelector(state=>state.IncartG)

    useEffect(()=>{
        setquantity(produc.quantity)
    },[IncartG]) 

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

    useEffect(()=>{
        despachador(updateCartThunk(produc,quantity))
    },[quantity])

    const handleDelete=()=>{
        despachador(deleteCartThunk(produc))
    }

    
    return (
    
    <div className='pro_cart'>
       
        <div className='img_productCart'>
            <img src={produc.images[1].url} alt="produc_img" />
        </div>

        <div className='info_product'>
            <h2 className='nombre_product'><span className='name_procduincart'>{produc.title}</span></h2>
            <div className='totals'>
                <span>Units: <b>{produc.quantity}</b></span>
                <span>Price unit: <b>{produc.price}</b> </span>
                <span>Subtotal: <b>${(produc.price*produc.quantity).toFixed(2)}</b></span>
            </div>
            <div className='contador1' onClick={handleConta}>
                <span className='conta1'><i className='bx bx-minus'></i></span>
                <span className='conta1'>{produc.quantity}</span>
                <span className='conta1'><i className='bx bx-plus'></i></span>
            </div>  
            
        </div> 

        <i onClick={handleDelete} className='bx bx-trash'></i> 
        
    </div>
  )
}

