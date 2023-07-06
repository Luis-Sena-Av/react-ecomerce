import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFecth } from '../hooks/useFecth'
import '../styles/register_style.css'
import { useNavigate, useParams } from 'react-router-dom'


export const Login = () => {

    const {register,handleSubmit,reset}=useForm()
    const [infoUser,,,loginUser]=useFecth()
    const user=JSON.parse(localStorage.getItem("user"))
    const url="https://e-commerce-api-v2.academlo.tech/api/v1/users/login"
    const navigate=useNavigate()
  
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
  
    const salir=()=>{
      localStorage.clear()
      navigate("/login")
    }
  
    return (
    <div className='login_page'>

      {localStorage.getItem('token')?
      <div className='loguiado'>
        <div className='icon_user'>
          <i className='bx bxs-user'></i>
        </div>
        <h3>{user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1)+" "+user.lastName.charAt(0).toUpperCase()+user.lastName.slice(1)}</h3>
        <li style={{cursor:"pointer"}} onClick={salir}>Log Out</li>
      </div>   
      :
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
          <button className='boton_'>Login</button>
        </form>
      </div>        

      }

    </div>
  )
}
