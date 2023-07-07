import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfigAuth } from "../../utils/getConfigAuth";

const cartSlice= createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        setCartG:(state,action)=>action.payload,
        addProductCartG:(state,action)=>[...state,action.payload],
        deleteProductCartG:(state,action)=>{
         return   state.filter(product=>product.id!==action.payload.id)
        }        
    }
})

export const {setCartG,addProductCartG,deleteProductCartG}=cartSlice.actions

export default cartSlice.reducer

export const getCartThunk=()=>(despachador)=>{
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/cart"
    axios.get(url,getConfigAuth())
        .then(res=>despachador(setCartG(res.data)))
        .catch(err=>console.log(err))
}


//Agregar al cart
export const addCartThunk=(data)=>(despachador)=>{ 

    const url="https://e-commerce-api-v2.academlo.tech/api/v1/cart"    
    axios.post(url,data,getConfigAuth())
        .then(res=>{
            console.log(res.data) 
        })
        .catch(err=>console.log(err))
}

//actualizar producto
export const updateCartThunk=(product,quantity)=>(despachador)=>{

    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`
    const data={
        quantity:quantity
    }
    console.log(data)
    axios.put(url,data,getConfigAuth())
        .then(res=>{
            console.log(res.data)
            despachador(getCartThunk())
        })
        .catch(err=>console.log(err))
}

//Eliminar producto del carro
export const deleteCartThunk=(product)=>(despachador)=>{
    
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`
    
    axios.delete(url,getConfigAuth())
        .then(res=>{
            console.log(res.data)
            despachador(deleteProductCartG(product)) 
        })
        .catch(err=>console.log(err))
}


