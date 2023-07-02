import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectecRoutes = () => {  
    if(localStorage.getItem('token')){
        return <Outlet/>
    }else{
        return <Navigate to='/login'/>
    }  
}
