import React from 'react'
import style from './style.module.css'

export default function Navbar() {
  return (
    <div className={style.navbarContainer}>
        <div>
            E-commerce
        </div>      
        <div className={style.navigation}>
            <p>Customer</p>
            <p>Vendor</p>

        </div>
    </div>
  )
}
