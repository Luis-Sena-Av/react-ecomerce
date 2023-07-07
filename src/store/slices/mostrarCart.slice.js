import { createSlice } from "@reduxjs/toolkit";

const mostrarCartSlice = createSlice({
    name:'mostrarCartG',
    initialState:false,
    reducers:{
        setmostrarCartG:(state,action)=>action.payload
    }
})

export const {setmostrarCartG}=mostrarCartSlice.actions
export default mostrarCartSlice.reducer