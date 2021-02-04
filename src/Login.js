import React,{ useState } from 'react'
import './Login.css'
import { Link,useHistory } from 'react-router-dom'
import { auth } from './firebase'

function Login() {
  const history = useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const signIn = e=>{
    e.preventDefault()
    //firebase sign in
    auth.signInWithEmailAndPassword(email,password)
    .then(auth => {
      history.push('/')
    })
    .catch(error => alert(error.message))
  }
  const register = e => {
    e.preventDefault()
    //firebase register
    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) =>{
      //successfully create a new user
      console.log(auth)
      if(auth){
        history.push('/')
      }
    })
    .catch(error => alert(error.message))
  }
  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src="./images/logo-1.png" />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={(e=>setEmail(e.target.value))}/>

          <h5>Password</h5>
          <input type='password' value={password} onChange={(e=>setPassword(e.target.value))}/>

          <button className="login__signInButton" onClick={signIn} type='submit'> Sign in</button>

        </form>
        <p>
        By Signing-in you agree to the AMAON FAKE CLONE Conditions of Use & Sale.
        Please see our Privacy Notice, out Cookies Notice an our Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={register}>Create your Amazon account</button>
      </div>
    </div>
  )
}

export default Login
