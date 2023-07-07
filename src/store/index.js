import { configureStore } from "@reduxjs/toolkit";
import ProductsG from './slices/productos.slice'
import mostrarCartG from "./slices/mostrarCart.slice";
import cart from "./slices/cart.slice";

export default configureStore({
    reducer:{
        ProductsG,
        cart,
        mostrarCartG
    }
})