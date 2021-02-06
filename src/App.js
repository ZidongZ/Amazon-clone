import React, { useEffect } from 'react'
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import Orders from './Orders'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51IGy2OFGNisdqnbNQvRq6L9JlWEoYovogg6tXkJaer4a753ur5fzerCA5F46P4di66KxVEWbqtUk4np4zj5qHezC00ZC9G4nxh")

function App() {
  const [{},dispatch] = useStateValue()

  useEffect(()=>{
    //will only run once when the app component loads...
    auth.onAuthStateChanged(authUser =>{

      if(authUser){
        //The user was logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        //The user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
