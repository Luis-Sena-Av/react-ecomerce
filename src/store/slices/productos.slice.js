import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const producSlice=createSlice({
name:'ProductsG',
initialState:null,
reducers:{
    setProductsG:(state,action)=>action.payload
}

})

export const {setProductsG}=producSlice.actions

export default producSlice.reducer

export const getAllProductsThunk=()=>(despachador)=>{
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/products"
    axios.get(url)
        .then(res=>despachador(setProductsG(res.data)))
        .catch(err=>console.log(err))
}