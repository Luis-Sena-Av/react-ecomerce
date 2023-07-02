import React, { useEffect, useRef, useState } from 'react'
import { useFecth } from '../hooks/useFecth'
import { CardProduct } from '../components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from '../store/slices/productos.slice'
import { useForm } from 'react-hook-form'

export const Home = () => {

  const Products=useSelector(state=>state.ProductsG)
  const [nameProduct, setNameproduct] = useState("")
  const despachador=useDispatch()
  const [categories,getcategories]=useFecth()

  const [filterPrice, setfilterPrice] = useState({
    min:0,
    max:Infinity
  })

  const {register,handleSubmit}=useForm()

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

  return (
    
    <div className='home'>

      <div>
        <h2>Price</h2>
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label htmlFor="from">From</label>
            <input  type="number" {...register("min")}/>
          </div>
          
          <div>
            <label htmlFor="from">To</label>
            <input type="number" {...register("max")}/>
          </div> 
          <button>Filter Price</button>     
        </form>
      </div>
              
        
     

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
        {Products?.filter(prod=>prod.title.toLowerCase().includes(nameProduct)).filter(filter_Price).map(product=>
          <CardProduct product={product} key={product.id}/> 
        )}
      </div>


    </div>
    
  )
}
