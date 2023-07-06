import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useFecth = () => {

  const [infoApi, setinfApi] = useState()
  const navigate=useNavigate()
  

  // Create
  const createRegister=(url,data)=>{
    axios.post(url,data)
      .then(res=>setinfApi(res.data))
      .catch(err=>console.log(err))
  }

  // Read
  const getApi=(url)=>{
    axios.get(url)
      .then(res=>setinfApi(res.data))
      .catch(err=>console.log(err))
  }

  //logiarse
  const loginUser=(url,data)=>{
    axios.post(url,data)
      .then(res=>{
        setinfApi(res.data)
        navigate(-2)
    })
    .catch(err=>console.log(err))
  }
    

  return [infoApi,getApi,createRegister,loginUser]
}
