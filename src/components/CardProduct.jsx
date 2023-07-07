import '../styles/card_style.css'
import { useNavigate } from 'react-router-dom'
import { addCartThunk} from '../store/slices/cart.slice'
import { useDispatch } from 'react-redux'

export const CardProduct = ({product}) => {

  const navigate= useNavigate()
  const despachador=useDispatch()  
  
  const handleproduct=()=>{
    navigate(`/product/${product.id}`)
  }  
  
  const data={
    quantity: 1,
    productId:product.id
  }
 
  const handlecart=e=>{
    e.stopPropagation()
    despachador(addCartThunk(data))
  } 

  return (
    
    <div className='product' onClick={handleproduct}>

      <div className='img_product'>
        <img src={product.images[0].url} alt={product.title} />
      </div>

      <hr />

      <div className='product_info'>
        
        <div>
          <p><span className='brand'>{product.brand}</span>  <span>{product.title}</span></p>
          <p><span className='price'>Price :</span>  <b>${product.price}</b></p>
        </div>

        <div onClick={handlecart} className='carro_card'>
          <i  onClick={handlecart} className='bx bx-cart '></i>
        </div>  
          
      </div>

    </div>
  )
}
