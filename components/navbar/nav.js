"use client";
import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import axios from 'axios'
import { useRouter } from 'next/navigation';
const Nav = () => {
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  const checkIfLogin  = async () =>{
    const response = await axios.get("/api/sessionControl")
    console.log(response)
    if(response.status == 200){
      setIsLoggedIn(true)
    }
    else {setIsLoggedIn(false)}
  }
  useEffect(()=>{
    checkIfLogin()
  },[router])

  const handleLogout = async()=>{
    const response = await axios.get("/api/logout")
    if(response.status == 200){
        router.push('/');
      }
  }
  const handleLogIn = ()=>{
   
        router.push('/');
      
  }
  return (
    <div className={style.navbar}>
        <div className={style.name}>
          Cat App
        </div>
        {
          isLoggedIn  == true && <button className={style.Logoutbutton}  onClick={()=>handleLogout()}>
          LogOut
        </button>
        
        }
         {
          isLoggedIn  == false &&<button className={style.Loginbutton} onClick={()=>handleLogIn()}>
          Login
        </button>
         }
        
      </div>
  )
}

export default Nav