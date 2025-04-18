import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import NavBar from '../navbar/nav-bar';
import style from './styles.module.css'


export default function index() {

    const { cart } = useSelector((state) => state);

    return (
        <>
            <NavBar />

            <div className= {style.cartContainer}>
                <h1>Welcome to Cart</h1>
            </div>

            <div>
                {cart.productName}
            </div>


        </>
    )
}
