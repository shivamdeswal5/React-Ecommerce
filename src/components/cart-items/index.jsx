import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../navbar/nav-bar";
import style from "./styles.module.css";
import CartProducts from "./cart-products";
import { useState } from "react";

export default function CartItem() {
  
  const {cart} = useSelector((state)=>state);
  const [totalAmount,setTotalAmount] = useState(0);

useEffect(() => {
  const total = cart.reduce((acc, curr) => acc + parseFloat(curr.productPrice), 0);
  setTotalAmount(total);
}, [cart]);

  return (
    <>
      <NavBar />

      <div className={style.cartContainer}>
        <h1>Welcome to Cart</h1>
      </div>
        <div className={style.cartItems}>
          {cart.map((product, index) => (
            <CartProducts
              key={index}
              name={product.productName}
              desc={product.productDescription}
              category={product.productCategory}
              price={product.productPrice}
              img={product.productThumbnail}
              product={product}
              id={index}
            />
          ))}
        </div>
        <div className={style.orders}>
          <p className={style.summary}> 
            <h2 className={style.grnSummary}>Your Order Summary</h2>
           <p>
           Total Items: {cart.length}
           </p>
          </p>
          <p>
            Total Price: Rs {totalAmount}
          </p>
        </div>
    </>
  );
}
