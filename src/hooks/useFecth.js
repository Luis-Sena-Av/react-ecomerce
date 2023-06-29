import axios from 'axios'
import React, { useState } from 'react'

export const useFecth = () => {

  const [infoApi, setinfApi] = useState()

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
    

  return [infoApi,getApi,createRegister]
}
