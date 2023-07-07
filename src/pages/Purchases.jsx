import React, { useEffect } from 'react'
import usePurchase from '../hooks/usePurchase'
import { CardPurches } from '../components/CardPurches'

export const Purchases = () => {

  const {purchase,getPurchases}= usePurchase()
  useEffect(()=>{
    getPurchases()
  },[])

  return (
    <div className='container_purchese'>
      {purchase?.map(compra=> <CardPurches compra={compra} key={compra.id}/> )}
    </div>
  )
}
