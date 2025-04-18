import React, { useState } from 'react'
import NavBar from '../navbar/nav-bar'
import AllProducts from '../product-card/all-products'
import style from './style.module.css'



export default function Customer() {
  const products = JSON.parse(localStorage.getItem("vendorProducts"));
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    console.log(searchItem);
  }
  
  const debounce = (func,wait) =>{
    let timerId
    return (...args) =>{
      clearTimeout(timerId);
      timerId = setTimeout(()=> func(...args),wait)
    }
  }

  const debounceCall = debounce(handleSearch,400);

  const filterData = products.filter((product)=>{
    return searchItem.toLowerCase() === '' ? product : product.productName.toLowerCase().includes(searchItem);
  });

  return (
    <div>
      <NavBar />

      <div className={style.inputBar}>
        <input className={style.search} type="text" placeholder='Search for Products' onChange={debounceCall} />

      </div>

      <div className={style.allProducts}>

        {
          filterData.map((product, index) => (
            <AllProducts key={index}
              name={product.productName}
              desc={product.productDescription}
              price={product.productPrice}
              category={product.productCategory}
              img={product.productThumbnail}
              id={index}
            />
          ))
        }

      </div>
    </div>
  )
}
