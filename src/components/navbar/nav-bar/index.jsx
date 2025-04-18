import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import style from './style.module.css'

export default function NavBar() {
  return (
    <div className={style.navbarContainer}>

      <h3>E-Commerce</h3>
        <div className={style.shoppingCart} >
          <FaShoppingCart />
        </div>
    </div>
  )
}
