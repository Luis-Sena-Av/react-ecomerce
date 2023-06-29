import React, { useEffect } from 'react'
import { useFecth } from '../hooks/useFecth'
import { CardProduct } from '../components/CardProduct'
import { useSelector } from 'react-redux'

export const Home = () => {
    const Products=useSelector(state=>state.ProductsG)
  return (
    
        <div className='Products'>
            {Products?.map(product=>
            <CardProduct product={product} key={product.id}/> 
            )}
        </div>
  )
}
