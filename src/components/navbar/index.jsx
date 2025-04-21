import React from 'react'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signup");
  };

  return (
    <div className={style.navbarContainer}>
        <div>
            E-commerce
        </div>      
        <div className={style.navigation} onClick={handleLogout}>
          Logout           
        </div>
    </div>
  )
}
