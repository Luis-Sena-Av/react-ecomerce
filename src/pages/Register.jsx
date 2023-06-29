import React from 'react'
import { useForm } from 'react-hook-form'
import '../styles/register_style.css'
import { useFecth } from '../hooks/useFecth'

export const Register = () => {

    const {register,handleSubmit,reset}= useForm()

    const [,,createRegister]=useFecth()
    
    const submit=data=>{        
        const url="https://e-commerce-api-v2.academlo.tech/api/v1/users"
        createRegister(url,data)
        reset({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            phone:""
        })
       
    }


  return (
    <div>

        <form onSubmit={handleSubmit(submit)} >

            <div>
                <label htmlFor="First Name">First Name</label>
                <input type="text" id='First Name' {...register('firstName')} />
            </div>

            <div>
                <label htmlFor="Last Name">Last Name</label>
                <input type="text" id='Last Name' {...register('lastName')}/>
            </div>

                        
            <div>
                <label htmlFor="Email">Email</label>
                <input type="Email" id='Email' {...register('email')}/>
            </div>

            
            <div>
                <label htmlFor="Password">Password</label>
                <input type="password" id='password' {...register('password')}/>
            </div>

            
            <div>
               <label htmlFor="Phone">Phone</label>
               <input type="number" id='phone' {...register('phone')} />
            </div>   
            
            <button>Submit</button>       

        </form>

    </div>
  )
}







