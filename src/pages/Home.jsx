import React, { useEffect, useRef, useState } from 'react'
import { useFecth } from '../hooks/useFecth'
import { CardProduct } from '../components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from '../store/slices/productos.slice'

export const Home = () => {

  const Products=useSelector(state=>state.ProductsG)

  const [nameProduct, setNameproduct] = useState("")

  const despachador=useDispatch()

  const [categories,getcategories]=useFecth()

  useEffect(()=>{
    getcategories("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
  },[])

  useEffect(()=>{
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/products"
    despachador(getAllProductsThunk(url))
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

  return (
    
    <div className='home'>

      <div>
        <h2>Category</h2>
        <ul style={{cursor:"pointer"}}>
          <li onClick={()=>handleClick()}>All categories</li>
          {categories?.map(categoty=> 
        
          <li key={categoty.id} onClick={()=>handleClick(categoty.id)}>
            {categoty.name}
          </li> 
        )}
        </ul>
      </div>


      <div>

        <label htmlFor="FiltronName"></label>

        <input
          type="text" 
          value={nameProduct}
          onChange={handleChange}
          placeholder='What are you looking for?'
        />
      </div>
      
    
      <div className='Products'>
        {Products?.filter(prod=>prod.title.toLowerCase().includes(nameProduct)).map(product=>
          <CardProduct product={product} key={product.id}/> 
        )}
      </div>


    </div>
    
  )
}
