import axios from 'axios'
import React, { useState } from 'react'
import { getConfigAuth } from '../utils/getConfigAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setCartG } from '../store/slices/cart.slice'

const usePurchase = () => {

    const [purchase, setpurchase] = useState()
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/purchases"

    const despachador=useDispatch()

    const getPurchases=()=>{
        axios.get(url,getConfigAuth())
            .then(res=>{
                setpurchase(res.data)
            })
            .catch(err=>console.log(err))
    }

    const Cartpurchases=()=>{
        axios.post(url,{},getConfigAuth())
            .then(res=>{console.log(res.data)
                despachador(setCartG([]))
            })
            .catch(err=>console.log(err))
    }


  return {purchase,getPurchases,Cartpurchases}
}

export default usePurchase