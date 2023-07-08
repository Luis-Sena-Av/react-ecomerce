import React, { useEffect, useState } from 'react'
import { useFecth } from '../hooks/useFecth'
import { CardProduct } from '../components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from '../store/slices/productos.slice'
import { useForm } from 'react-hook-form'
import "../styles/home.css"
import { Cart } from './Cart'
import {getCartThunk } from '../store/slices/cart.slice'
import { IsProdructCart } from '../components/isProdructCart'
import { ProductInCart } from '../components/ProductInCart'
export const Home = () => {

  const Products=useSelector(state=>state.ProductsG)
  const [nameProduct, setNameproduct] = useState("")
  const despachador=useDispatch()
  const [categories,getcategories]=useFecth()
  const [showcategory, setshowcategory] = useState(false)
  const [showPrice, setshowPrice] = useState(false)
  const mostrarCartG=useSelector(state=>state.mostrarCartG)
  const [filterPrice, setfilterPrice] = useState({
    min:0,
    max:Infinity
  })
  const IncartG=useSelector(state=>state.IncartG)
  const {register,handleSubmit}=useForm()
  useEffect(()=>{
    getcategories("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
  },[])

  useEffect(()=>{
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/products"
    despachador(getAllProductsThunk(url))
    despachador(getCartThunk())
  },[])
    
  const handleChange=(e)=>{
    setNameproduct(e.target.value.toLowerCase())
  }

  const handleClick=(id)=>{
    if(id){
      const url=`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`
      despachador(getAllProductsThunk(url))
    }else{
      const url="https://e-commerce-api-v2.academlo.tech/api/v1/products"
      despachador(getAllProductsThunk(url))
    }
  }

  const submit=data=>{
    const filter_Price={
      min: data.min===''?0:+data.min,
      max: data.max===''?Infinity:+data.max
    }
    setfilterPrice(filter_Price)
  }

  const filter_Price=prod=>{
    const condMin= prod.price>=filterPrice.min
    const conMax= prod.price<=filterPrice.max
    return condMin && conMax
  }

 const show_lis=()=>{
  setshowcategory(!showcategory)
 }

 const show_list=()=>{
  setshowPrice(!showPrice)
 } 


 return ( 

  <div className='contain_home'> 
    {IncartG[0]?<IsProdructCart/>:IncartG[1]?<ProductInCart/>:<div></div> }

    <div className={`container_cart ${mostrarCartG&&'mostrar_Cart'}`}>
      <Cart/>
    </div>

    <div className='home'>

      <div className='filtros'>

        <div className='filter_price'>
          <h2 className='price_' onClick={show_list}>Price <i className={`bx bx-chevron-down ${showPrice&&'rota'} `}></i></h2>
            <form onSubmit={handleSubmit(submit)} className={`list_price ${showPrice&&'list_price_show'}`} >
              <div>
                <label htmlFor="from">From</label>
                <input  type="number" {...register("min")}/>
              </div>
            
              <div>
                <label htmlFor="from">To</label>
                <input type="number" {...register("max")}/>
              </div> 
              <button className='buton_filter'>Filter Price</button>     
            </form>
        </div> 

        <div className='fiter_category'>
          <h2 className='category' onClick={show_lis} >Category <i className={`bx bx-chevron-down ${showcategory&&'rota'} `}></i></h2>
          <ul style={{cursor:"pointer"}} className={`list_category ${showcategory&&'list_category_show'}`} >
            <li onClick={()=>handleClick()}>All categories</li>
            {categories?.map(categoty=> 
          
            <li key={categoty.id} onClick={()=>handleClick(categoty.id)}>
              {categoty.name}
            </li> 
          )}
          </ul>
        </div>   

      </div>
            
      <div className='principal_home'>
        <div className='conten_filtername'>
          <label htmlFor="FiltronName"></label>
          <input
            className='filtro_name'
            type="text" 
            value={nameProduct}
            onChange={handleChange}
            placeholder='What are you looking for?'
          />
        </div>
      
        <div className='Products'>
          {Products?.filter(prod=>prod.title.toLowerCase().includes(nameProduct)).filter(filter_Price).map(product=>
            <CardProduct  product={product} key={product.id}/> 
          )}
        </div>
      </div> 

    </div>

  </div>
     
 )

}
