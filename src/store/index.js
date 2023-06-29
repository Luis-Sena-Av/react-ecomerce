import { configureStore } from "@reduxjs/toolkit";
import ProductsG from './slices/productos.slice'

export default configureStore({
    reducer:{
        ProductsG
    }
})