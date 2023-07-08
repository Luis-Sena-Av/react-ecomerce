import { configureStore } from "@reduxjs/toolkit";
import ProductsG from './slices/productos.slice'
import mostrarCartG from "./slices/mostrarCart.slice";
import cart from "./slices/cart.slice";
import IncartG from "./slices/InCart.slice"

export default configureStore({
    reducer:{
        ProductsG,
        cart,
        mostrarCartG,
        IncartG
    }
})