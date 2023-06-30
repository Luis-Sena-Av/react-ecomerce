import React, { useEffect } from 'react'
import usePurchase from '../hooks/usePurchase'
import { CardPurches } from '../components/cardPurches'

export const Purchases = () => {

    const {purchase,getPurchases}= usePurchase()

    useEffect(()=>{
        getPurchases()
    },[])

    console.log(purchase)

  return (
    <div>
      {purchase?.map(compra=> <CardPurches compra={compra} key={compra.id}/> )}
    </div>
  )
}
