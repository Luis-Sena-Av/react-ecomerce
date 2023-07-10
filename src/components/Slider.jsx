import React from 'react'

export const Slider = ({product,indexSlider}) => {
    
    const tranlate_slider={
        transform:`translate(calc(${-indexSlider}/3*100%))`
    }

  return (
    <div className='Slider_conten_img' style={tranlate_slider}>            
        {product?.images.map(img_produc=>
            <div key={img_produc.id} className='conten_img'>
                <img className='img_product_slider' src={img_produc.url} alt="imagen_producto"  />
            </div>        
        )}
    </div>
  )
}
