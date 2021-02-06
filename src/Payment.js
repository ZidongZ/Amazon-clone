import React, { useState,useEffect } from 'react'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link,useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getTotalPrice } from './reducer'
import { db } from './firebase'
import axios from './axios'
import './Payment.css'

function Payment() {
  const [state,dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientSecret] = useState(true)

  const stripe = useStripe()
  const elements = useElements()
  const history = useHistory()

  useEffect(()=>{
    const getClientSecret = async() => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in  a currencies subunits
        url: `/payment/create?total=${getTotalPrice(state.basket)*100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  },[state.basket])


  const handleSubmit = async(e) => {
    e.preventDefault()
    setProcessing(true)


    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      //paymentIntent = payment confirmation

      db.collection('users')
      .doc(state.user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket: state.basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch({
        type: 'EMPTY_BASKET'
      })

      history.push('/orders')
    })
  }

  const handleChange = event => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{state.basket.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{state.user?.email}</p>
            <p>123 react lane</p>
            <p>Log Angeles, CA</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {state.basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                src={item.src}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className='payment__section'>
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale ={2}
                  value={getTotalPrice(state.basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
