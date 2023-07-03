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

export const getAllProductsThunk=(url)=>(despachador)=>{
    axios.get(url)
        .then(res=>despachador(setProductsG(res.data)))
        .catch(err=>console.log(err))
}