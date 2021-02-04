import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import FlipMove from 'react-flip-move'


function Checkout() {
  const [state,dispatch] = useStateValue()

  return (
    <div class="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" />
        <div>
          <h3 className="checkout__user">Hello, {state.user ? state.user?.email : "Guest"}</h3>
          <h2 className="checkout__title">Your shopping basket</h2>
              {state.basket.map(item=>(
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  src={item.src}
                  price={item.price}
                  rating={item.rating}
                />
              ))
              }
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
