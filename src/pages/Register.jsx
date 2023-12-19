import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import bgImg from '../pages/bg2.jpg'
export default function Register() {
    const [Name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onSubmit = async (e)=>{
      e.preventDefault();
      try{
        await axios.post("https://recipe-app-api-cifg.onrender.com/api/v1/user/register",{
          Name,email,password
        });
        alert("Registration completed!Now Login.")
      }catch(err){
        console.error(err);
      }
    };

    return <Form 
              Name={Name} setName={setName} 
              email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword}
              label="Register"
              onSubmit={onSubmit}/>
}
const Form =({Name, setName, email, setEmail, password, setPassword,label,onSubmit})=>{
  return(
    <div  className='main' style={{backgroundImage:`url(${bgImg})`}}>
      <div className='register-container'>
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className='form-group'>
            <label htmlFor='Name'>
              Name
            </label>
            <input type='text' id='Name' value={Name} onChange={(e)=>setName(e.target.value)}/>
          </div>
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
          <button className="btn btn-outline-light" type='submit'>{label}</button>
        </form>
        <h4>Aready have an account</h4>
        <Link to="/login">
          <button className="btn btn-outline-light" type="button">Login</button>
        </Link>
      </div>
    </div>
    
  )
}