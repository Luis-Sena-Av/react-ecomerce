import React from 'react'
import '../styles/card_style.css'
import { useNavigate } from 'react-router-dom'

export const CardProduct = ({product}) => {

  const navigate= useNavigate()

  const handleproduct=()=>{
    navigate(`/product/${product.id}`)
  }

  const handlecart=e=>{
    e.stopPropagation()
  }

  return (
    <div className='product' onClick={handleproduct}>

      <div className='img_product'>
        <img src={product.images[0].url} alt={product.title} />
      </div>

      <hr />

      <div className='product_info'>
        <div>
          <p><span className='brand'>{product.brand}</span>  <span>{product.title}</span></p>
          <p><span className='price'>Price :</span>  <b>${product.price}</b></p>
        </div>
        <div onClick={handlecart}>
          <i className='bx bx-cart'></i>
        </div>        
        
      </div>

    </div>
  )
}
