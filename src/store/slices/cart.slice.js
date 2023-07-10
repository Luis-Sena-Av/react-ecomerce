import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfigAuth } from "../../utils/getConfigAuth";
import { setIncartG } from "./InCart.slice";

const cartSlice= createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        setCartG:(state,action)=>action.payload,
        addProductCartG:(state,action)=>[...state,action.payload],
        deleteProductCartG:(state,action)=>{
         return   state.filter(product=>product.id!==action.payload.id)
        },
        updateProductCartG:(state,action)=>{
            state.map(prod=>{
                if(prod.id===action.payload.id){
                    return action.payload
                }else{
                    return prod
                }
            })            
        }        
    }
})

export const {setCartG,addProductCartG,deleteProductCartG,updateProductCartG}=cartSlice.actions

export default cartSlice.reducer

//obtener
export const getCartThunk=()=>(despachador)=>{
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/cart"
    axios.get(url,getConfigAuth())
        .then(res=>{despachador(setCartG(res.data))})
        .catch(err=>console.log(err))
}

//Agregar al cart
export const addCartThunk=(data,product)=>(despachador)=>{ 

    const url="https://e-commerce-api-v2.academlo.tech/api/v1/cart"    
    axios.post(url,data,getConfigAuth())
        .then(res=>{
            console.log({...res.data,product:product})
            despachador(addProductCartG({...res.data,product:product}))
            despachador(getCartThunk())
            despachador(setIncartG([false,true,false]))
            setTimeout(() => {
                despachador(setIncartG([false,false,false]))  
            }, 2000);
        
        })
        .catch(err=>{console.log(err)
            despachador(setIncartG([true,false,false]))
            despachador(getCartThunk())
            setTimeout(() => {
                despachador(setIncartG([false,false,false])) 
            }, 2000);
        })
}

//actualizar producto
export const updateCartThunk=(produc,quantity)=>(despachador)=>{

    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${produc.id}`
    const data={
        quantity:quantity
    }
    axios.put(url,data,getConfigAuth())
        .then(res=>{
            updateProductCartG({...res.data,product:produc.product})
            despachador(getCartThunk())
            setTimeout(() => {
                despachador(setIncartG([false,false,false]))            
            }, 2000);
        })
        .catch(err=>console.log(err))
}

//Eliminar producto del carro
export const deleteCartThunk=(product)=>(despachador)=>{
    
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`
    
    axios.delete(url,getConfigAuth())
        .then(res=>{
            despachador(deleteProductCartG(product)) 
        })
        .catch(err=>console.log(err))
}


