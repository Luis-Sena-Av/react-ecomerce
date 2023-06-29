import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFecth } from '../hooks/useFecth'
import '../styles/register_style.css'

export const Login = () => {

    const {register,handleSubmit,reset}=useForm()
    const [infoUser,,loginUser]=useFecth()
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/users/login"

    const submit=(data)=>{
        loginUser(url,data)
        reset({
           email:"",
           password:"" 
        })
    }

    useEffect(()=>{
        if(infoUser){
            localStorage.setItem("token",infoUser.token)
            localStorage.setItem("user",JSON.stringify(infoUser.user))
        }
        
    },[infoUser])


    return (
    <div className='register'>
        <h2 className='login'>Login</h2>
      <form onSubmit={handleSubmit(submit)}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <button className='boton'>Login</button>

      </form>
    </div>
  )
}
