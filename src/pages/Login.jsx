import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import bgImg from '../pages/bg.webp'

export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [_,setCookies]=useCookies(["access_token"])
  

  const navigate =useNavigate()

  const onSubmit= async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:9036/api/v1/user/login",{
        email,
        password
      });
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userId", res.data.userId);
      navigate("/")
    }catch(err){
      console.error(err)
    }
  }
  return <Form 
              email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword}
              label="Login"
              onSubmit={onSubmit}/>
              
  }
    const Form =({email, setEmail, password, setPassword, label,onSubmit})=>{
    return (
      <div className='main' style={{backgroundImage:`url(${bgImg})`}}>
        <div className='auth-container'>
          <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className='form-group'>
              <label htmlFor='email'>
                Email
              </label>
              <input type='text' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>
                Password
              </label>
              <input type='text' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-outline-dark" type='submit'>{label}</button>
          </form>
          <h4>Don't have an account??</h4>
          <Link to="/register">
            <button className="btn btn-outline-dark" type="button">Register</button>
          </Link>
        </div>
      </div>
    )
  }