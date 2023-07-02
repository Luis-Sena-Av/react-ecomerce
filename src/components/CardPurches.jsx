import React from 'react'
import '../styles/purchese.css'

export const CardPurches = (compra) => {

  console.log(compra)

  return (
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
  )
}
