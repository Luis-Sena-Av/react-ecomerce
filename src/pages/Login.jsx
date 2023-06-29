import React from 'react'
import { useForm } from 'react-hook-form'
import { useFecth } from '../hooks/useFecth'

export const Login = () => {

    const {register,handleSubmit,reset}=useForm()
    const [,,loginUser]=useFecth()
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/users/login"

    const submit=(data)=>{
        loginUser(url,data)
        reset({
           email:"",
           password:"" 
        })
    }

    return (
    <div>
      <form onSubmit={handleSubmit(submit)}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <button>Login</button>

      </form>
    </div>
  )
}
