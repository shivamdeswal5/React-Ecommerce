import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import style from './style.module.css'
import { useSelector } from 'react-redux';

export default function NavBar() {

  const {cart} = useSelector((state)=>state);

  return (
    <div className={style.navbarContainer}>

      <h3>E-Commerce</h3>
        <div className={style.shoppingCart} >
          <FaShoppingCart />
          {cart.length}
        </div>
    </div>
  )
}
