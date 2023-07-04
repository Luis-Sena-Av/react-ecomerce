import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFecth } from '../hooks/useFecth'
import '../styles/product.css'
import { CardProduct } from '../components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { addCartThunk, getCartThunk, updateCartThunk } from '../store/slices/cart.slice'

export const ProductId = () => {
    const {id}=useParams()
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`
    const [product,getproduct]=useFecth()
    const [Similarproduct,getSimilarproduct]=useFecth()
    const despachador=useDispatch()
    const [quantity, setquantity] = useState(1)
    const cart=useSelector(state=>state.cart)
    useEffect(()=>{
        getproduct(url)
    },[id])

    useEffect(()=>{
        if(product){
            const urlCategory=`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${product?.category.id}`
            getSimilarproduct(urlCategory)
        }   
    },[product])


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

    const data={
        quantity: quantity,
        productId:product?.id
    }

    const updata={
        quantity: quantity
    }

    

    const handleAddcart=()=>{      
        despachador(addCartThunk(data)) 
        despachador(getCartThunk())
    }

  return (
    <div>
        
       <div className='product_info'>
        <span className='marca'>{product?.brand}</span>
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>

        <div className='cantidades'>
            <span className='canti1'><span>Price</span><b>${product?.price}</b></span>
            <span className='canti1'> 
                <span>Quantity</span>
            <div className='contador' onClick={handleConta}>
                <span className='conta'><i className='bx bx-minus'></i></span>
                <span className='conta'>{quantity}</span>
                <span className='conta'><i className='bx bx-plus'></i></span>
            </div>                
            </span>
        </div>
       
        <div className='agrega_product' onClick={handleAddcart}>
            Add to cart <i onClick={handleAddcart}  className='bx bx-cart carro'></i>
        </div>

       </div>
        <h1 className='similar'>Productos Similares</h1>
       <div className='Products'>
            {Similarproduct?.filter(prod=>prod.id!==product.id).map(product=>
            <CardProduct product={product} key={product.id}/> 
            )}
        </div>

    </div>
  )
}
