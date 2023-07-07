import React from 'react'
import '../styles/purchese.css'
import { useSelector } from 'react-redux'
import { Cart } from '../pages/Cart'

export const CardPurches = (compra) => {

  const mostrarCartG=useSelector(state=>state.mostrarCartG)
  

  return (
   
      <div className='contain_home'>
        <div className={`container_cart ${mostrarCartG&&'mostrar_Cart'}`}>
          <Cart/>
        </div>
        <div className='purchese'>
      <div className='img_product1'>
        <img src={compra.compra.product.images[1].url} alt="produc-img" />
      </div>

      <div className='name_putchese'>
        {compra.compra.product.title}
      </div>
      <div className='fecha_comp'>
        {compra.compra.product.updatedAt.slice(0,10)}
      </div>

      <div className='cantidad'>
        {compra.compra.quantity}
      </div>

      <div className='subtotal'>
       <b>$ {compra.compra.product.price*compra.compra.quantity}</b> 
      </div>
     
    </div>
      </div>
     
  )
}
