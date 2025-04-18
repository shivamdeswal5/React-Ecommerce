import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import style from './style.module.css'
import useLocalStorage from '../../hoooks/useLocalStorage';
import ProductCard from '../product-card';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Navbar from '../navbar';

export default function Vendor() {

  const [products, setProducts] = useLocalStorage("vendorProducts", []);
  const [open, setOpen] = React.useState(false);
  const [searchItem, setSearchItem] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setProducts([...products, data]);
    reset();
  }

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    console.log(searchItem);
  }

  const debounce = (func, wait) => {
    let timerId
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), wait)
    }
  }

  const debounceCall = debounce(handleSearch, 400);

  const filterData = products.filter((product) => {
    return searchItem.toLowerCase() === '' ? product : product.productName.toLowerCase().includes(searchItem);
  });

  return (

    <>
    <Navbar/>
      <div className={style.vendorContainer}>

        <div className={style.vendorContainer}>

          <h1>Click Below Button to add Products</h1>

          <Button variant="solid" color="danger" onClick={() => setOpen(true)}>
            Add Products
          </Button>

          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Sheet
              variant="outlined"
              sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h5"
                textColor="inherit"
                sx={{ fontWeight: 'lg', mb: 3, mt: 5 }}
              >

                <form

                  onSubmit={handleSubmit(onSubmit)}
                  className={style.productData}>

                  <div className={`${style.productName} ${style.flex}`}>
                    <label for="productName">Name</label>
                    <input
                      {...register('productName', {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Min Length should be more than 2"
                        },
                      })}
                      type='text'
                      id='productName'
                      placeholder='Product Name'

                    />{errors.productName && (<p className={style.errorPara}>{errors.productName.message}</p>)}

                  </div>

                  <div className={style.productDescription}>
                    <label for="productDescription">Description</label>
                    <input
                      {...register('productDescription', {
                        required: "Description is required",
                        minLength: {
                          value: 3,
                          message: "Desc. should be more then 10 lettters"
                        },
                      })}
                      type='text'
                      id='productDescription'
                      placeholder='Enter description'
                    />
                    {errors.productDescription && (<p className={style.errorPara}>{errors.productDescription.message}</p>)}
                  </div>

                  <div className={style.productPrice}>
                    <label for="productPrice">Price</label>
                    <input
                      {...register('productPrice', {
                        required: "Price is required",
                        minLength: {
                          value: 1,
                          message: "Amount should be double digit"
                        },
                      })}
                      type='text'
                      id='productPrice'
                      placeholder='Enter Price'
                    />
                    {errors.productPrice && (<p className={style.errorPara}>{errors.productPrice.message}</p>)}
                  </div>

                  <div className={style.productCategory}>
                    <label for="productCatgory">Category</label>
                    <input
                      {...register('productCategory', {
                        required: "Category is required",
                        minLength: {
                          value: 2,
                          message: "Desc. should be more then 2 lettters"
                        },
                      })}
                      type='text'
                      id='productCategory'
                      placeholder='Enter Category'
                    />
                    {errors.productCatgory && (<p className={style.errorPara}>{errors.productCategory.message}</p>)}
                  </div>

                  <div className={style.productThumbnail}>
                    <label for="productThumbnail">Thumbnail</label>
                    <input
                      {...register('productThumbnail', {
                        required: "Category is required",
                        minLength: {
                          value: 2,
                          message: "Desc. should be more then 2 lettters"
                        },
                      })}
                      type='text'
                      id='productThumbnail'
                      placeholder='Enter image url'
                    />
                    {errors.productThumbnail && (<p className={style.errorPara}>{errors.productCatgory.message}</p>)}
                  </div>

                  <button className={style.submitBtn} type='submit' >
                    Add Product
                  </button>

                </form>

              </Typography>

            </Sheet>
          </Modal>

        </div>

        <input type="text" className={style.inputBar} placeholder='Search your items' onChange={debounceCall} />

        <div className={style.vendorproducts}>
          {
            filterData.map((product, index) => (
              <ProductCard key={index}
                name={product.productName}
                desc={product.productDescription}
                price={product.productPrice}
                category={product.productCategory}
                img={product.productThumbnail}
                setProducts={setProducts}
                products={products}
                id={index}
              />
            ))
          }
        </div>

      </div>
    </>

  )
}
