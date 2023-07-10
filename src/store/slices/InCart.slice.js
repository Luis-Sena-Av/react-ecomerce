import { createSlice } from "@reduxjs/toolkit";

const Incart= createSlice({
    name:"IncartG",
    initialState:[false,false,false],
    reducers:{
        setIncartG:(state,action)=>action.payload
    }
})

export const {setIncartG}=Incart.actions
export default Incart.reducer