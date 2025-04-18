import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import NavBar from '../navbar/nav-bar';
import style from './styles.module.css'
import CartProducts from './cart-products'


export default function CartItem() {

    const { cart } = useSelector((state) => state);
    console.log(cart);

    return (
        <>
            <NavBar />

            <div className= {style.cartContainer}>
                <h1>Welcome to Cart</h1>
            </div>

            <div className={style.cartItems}>
                {
                    cart.map((product,index) => (
                        <CartProducts key={index}
                         name = {product.productName}
                         desc = {product.productDescription}
                         category = {product.productCategory}
                         price = {product.productPrice}
                         img = {product.productThumbnail}
                         product = {product}
                         id = {index}
                        />
                    ))
                }
                
            </div>



        </>
    )
}
