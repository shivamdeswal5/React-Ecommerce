import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import style from './style.module.css'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate();
  const {cart} = useSelector((state)=>state);
  const handleClick = ()=>{
    navigate('/cart')    
  }

  return (
    <div className={style.navbarContainer}>

      <h3>E-Commerce</h3>
        <div className={style.shoppingCart} onClick={handleClick} >
          <FaShoppingCart />
          <div>{cart.length}</div>
        </div>
        
    </div>
  )
}
