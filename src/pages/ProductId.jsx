import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFecth } from '../hooks/useFecth'
import '../styles/product.css'
import { CardProduct } from '../components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { addCartThunk, getCartThunk, updateCartThunk } from '../store/slices/cart.slice'
import { Cart } from './Cart'
import { ProductInCart } from '../components/ProductInCart'
import { UpdateQuantity } from '../components/UpdateQuantity'

export const ProductId = () => {
    const {id}=useParams()
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`
    const [product,getproduct]=useFecth()
    const [Similarproduct,getSimilarproduct]=useFecth()
    const despachador=useDispatch()
    const [quantity, setquantity] = useState(1)
    const cart=useSelector(state=>state.cart)
    const [ProducCart,setProducCart] = useState()
    const mostrarCartG=useSelector(state=>state.mostrarCartG)
    const IncartG=useSelector(state=>state.IncartG)
    
    useEffect(()=>{
        getproduct(url)
        despachador(getCartThunk())
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

    useEffect(()=>{
        if(product){
            const produc={...cart?.filter(prod=>prod.product.id===product.id)}
            setProducCart(produc[0])
        }
    },[id,cart])
    
    useEffect(()=>{
        if(product&&ProducCart){
            if(cart?.filter(prod=>prod.product.id===product.id).length>0){
                setquantity(ProducCart.quantity)
            }else{
                setquantity(1)
            }
        }        
    },[product])
    
    const handleAddcart=()=>{
        if(cart?.filter(prod=>prod.product.id===product.id).length>0){
            despachador(updateCartThunk(ProducCart,quantity))
            despachador(addCartThunk(data))
        }else{
            despachador(addCartThunk(data)) 
        }        
    }
console.log(IncartG)

  return (
    <div className='product_id'>
        <div className={`container_cart ${mostrarCartG&&'mostrar_Cart'}`}>
            <Cart/>
        </div>
        {IncartG[1]?<ProductInCart/>:IncartG[0]?<UpdateQuantity/>: <div></div> }
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
