import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 
import logo from '../pages/logo.png'

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate =  useNavigate()

  const logout=()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userId");
    navigate("/login")
  }
  return (
    <div className='navbar navbar-expand-lg bg-dark'>
      <div className='nav-left'>
        <img src={logo} alt='logo' style={{width:80}}/>
      </div>
      <div className='nav-center'>
        {!cookies.access_token?(
          <>
            <Link to="/login">Home</Link>
            <Link to="/login">Create</Link>
            <Link to="/login">Search</Link>
          </>):(<>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/search">Search</Link>
            
          </>
        )}
      </div>
      <div className='nav-right'>
        {!cookies.access_token?(
          <><Link to="/register">Register</Link><Link to="/login">Login</Link></>
        ):<div className='logout-btn'><button onClick={logout} className='btn btn-outline-light'>Logout</button></div>
        }
      </div>
      
      
    </div>
  )
}
