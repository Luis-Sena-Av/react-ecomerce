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
import { Slider } from '../components/Slider'
import { setIncartG } from '../store/slices/InCart.slice'

export const ProductId = () => {
    const {id}=useParams()
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`
    const [product,getproduct]=useFecth()
    const [Similarproduct,getSimilarproduct]=useFecth()
    const despachador=useDispatch()
    const [quantity, setquantity] = useState(1)
    const cart=useSelector(state=>state.cart)
    const [ProducCart,setProducCart] = useState()
    const [indexSlider,setindexSlider] = useState(0)
    const mostrarCartG=useSelector(state=>state.mostrarCartG)
    const IncartG=useSelector(state=>state.IncartG)
    
    useEffect(()=>{
        getproduct(url)
        despachador(getCartThunk())
    },[id,IncartG])

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

    useEffect(()=>{
        if(product){
            const produc={...cart?.filter(prod=>prod.id===product.id)}
            setProducCart(produc[0])
        }
    },[id,cart,product])
    
    useEffect(()=>{
        if(product&&ProducCart){
            if(cart?.filter(prod=>prod.id===product.id).length>0){
                setquantity(ProducCart.quantity)
            }else{
                setquantity(1)
            }
        }        
    },[product])
    
    
    const handleAddcart=()=>{
        if(cart?.filter(prod=>prod.id===product.id).length>0){
            despachador(updateCartThunk(ProducCart,quantity))
            despachador(setIncartG([true,false,false]))
        }else{
            despachador(addCartThunk(product,quantity)) 
        }        
    }
    
    const slider_left=()=>{
        if(indexSlider>0){
            setindexSlider(indexSlider-1)
        }
    }

    const slider_right=()=>{
        if(indexSlider<2){
            setindexSlider(indexSlider+1)
        }
    }
    
  return (
    <div className='product_id'>

        <div className='principal_producIs'>
            <div className='conten_imgs_product'>
                <div className='slider'>
                    <button className='btn_slider btn_left' onClick={slider_left}> &lt; </button> 
                    
                        <Slider product={product} indexSlider={indexSlider} />
                    
                    <button className='btn_slider btn_right' onClick={slider_right}>&gt;</button> 
                </div>

                <div className='preview_img'>
                    {product?.images.map((img_produc,i)=>
                    <div key={img_produc.id} className={`conten_img_preview ${i===indexSlider&&'border_img'}`} onClick={()=>setindexSlider(i)}>
                        <img className='img_product_slider' src={img_produc.url} alt="imagen_producto"  />
                    </div>        
                    )}
                </div>

            </div>        

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
                            <span className='conta2'>{quantity}</span>
                            <span className='conta'><i className='bx bx-plus'></i></span>
                        </div>                
                        </span>
                    </div>
            
                    <div className='agrega_product' onClick={handleAddcart}>
                        <span onClick={handleAddcart}>Add to cart</span> <i onClick={handleAddcart}  className='bx bx-cart carro'></i>
                    </div>

            </div>
        </div>

        <div className='secundar_producId'> 
            <h1 className='similar'>Productos Similares</h1>
            <div className='Products'>
                {Similarproduct?.filter(prod=>prod.id!==product.id).map(product=>
                <CardProduct product={product} key={product.id}/> 
                )}
            </div>
        </div>

        <div  className={`container_cart ${mostrarCartG&&'mostrar_Cart'}`}>
            <Cart/>
        </div>
        {IncartG[1]?<ProductInCart/>:IncartG[0]?<UpdateQuantity/>: <div></div> }

    </div>
  )
}
