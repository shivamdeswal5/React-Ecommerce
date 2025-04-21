import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state);

  const handleClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signup");
  };

  return (
    <div className={style.navbarContainer}>
      <h3>E-Commerce</h3>
      

      <div className={style.shoppingCart} >
        <FaShoppingCart onClick={handleClick} />
        <div onClick={handleClick}>{cart.length}</div>
        <div className={style.logout} onClick={handleLogout}>Logout</div>
      </div>

    </div>
  );
}
