"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import checkIfLogin from "@/libs/checkIfLoggedIn";
import { useGlobalContext } from '../../app/context/store';
const Nav = () => {
    const { setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();
    const [loading,setLoading] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkSession = async () => {
    setLoading(true)
    const response = await checkIfLogin();
    setIsLoggedIn(response);
    setLoading(false)
  };

  useEffect(() => {
    checkSession();
  }, [pathname]);

  const handleLogout = async () => {
    const response = await axios.get("/api/logout");
    if (response.status == 200) {
        setIsLoggedIn(false);
      router.push("/");
    }
  };
  const handleLogIn = () => {
    router.push("/");
  };
  return (
    <div className={style.navbar}>
      <div className={style.name}>Cat App</div>
      {!loading &&isLoggedIn == true && (
        <button className={style.Logoutbutton} onClick={() => handleLogout()}>
          LogOut
        </button>
      )}
      {!loading &&isLoggedIn == false && (
        <button className={style.Loginbutton} onClick={() => handleLogIn()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Nav;
