import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import style from './style.module.css';
import ProductCard from '../product-card';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Navbar from '../navbar';
import useLocalStorage from '../../hoooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid'; 

export default function Vendor() {
  const [allProducts, setAllProducts] = useLocalStorage('vendorProducts', {});
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const [currentUser] = useLocalStorage("currentUser", []);
  const vendorEmail = currentUser?.email;

  console.log("Current User:", currentUser);
  console.log("Vendor Email:", vendorEmail);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (vendorEmail) {
      const vendorList = allProducts[vendorEmail] || [];
      setProducts(vendorList);
    }
  }, [allProducts, vendorEmail]);

  const onSubmit = (data) => {
    if (vendorEmail) {
      const productWithId = {
        ...data,
        id: uuidv4(),  
      };

      const vendorList = allProducts[vendorEmail] || [];
      const updatedList = [...vendorList, productWithId];

      setAllProducts({ ...allProducts, [vendorEmail]: updatedList });
      setProducts(updatedList);
      reset();
      setOpen(false);
    } else {
      console.error("Vendor email is not found. Unable to save product.");
    }
  };

  const handleSearch = (e) => setSearchItem(e.target.value.toLowerCase());

  const debounce = (fn, ms) => {
    let id;
    return (...args) => {
      clearTimeout(id);
      id = setTimeout(() => fn(...args), ms);
    };
  };

  const debounceCall = debounce(handleSearch, 400);

  const filterData = products.filter(p =>
    !searchItem || p.productName.toLowerCase().includes(searchItem)
  );

  return (
    <>
      <Navbar />
      <div className={style.vendorContainer}>
        <h1>Welcome {currentUser?.firstName} {currentUser?.lastName}</h1>
        <Button variant="solid" color="danger" onClick={() => setOpen(true)}>
          Add Products
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography component="h2" id="modal-title" level="h5" sx={{ fontWeight: 'lg', mb: 3, mt: 5 }}>
              <form onSubmit={handleSubmit(onSubmit)} className={style.productData}>
                <div className={`${style.productName} ${style.flex}`}>
                  <label htmlFor="productName">Name</label>
                  <input
                    {...register('productName', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Min Length should be more than 2' },
                    })}
                    type="text"
                    id="productName"
                    placeholder="Product Name"
                  />
                  {errors.productName && <p className={style.errorPara}>{errors.productName.message}</p>}
                </div>

                <div className={style.productDescription}>
                  <label htmlFor="productDescription">Description</label>
                  <input
                    {...register('productDescription', {
                      required: 'Description is required',
                      minLength: { value: 3, message: 'Should be more than 10 letters' },
                    })}
                    type="text"
                    id="productDescription"
                    placeholder="Enter description"
                  />
                  {errors.productDescription && <p className={style.errorPara}>{errors.productDescription.message}</p>}
                </div>

                <div className={style.productPrice}>
                  <label htmlFor="productPrice">Price</label>
                  <input
                    {...register('productPrice', {
                      required: 'Price is required',
                      minLength: { value: 1, message: 'Should be double digit' },
                    })}
                    type="text"
                    id="productPrice"
                    placeholder="Enter Price"
                  />
                  {errors.productPrice && <p className={style.errorPara}>{errors.productPrice.message}</p>}
                </div>

                <div className={style.productCategory}>
                  <label htmlFor="productCategory">Category</label>
                  <input
                    {...register('productCategory', {
                      required: 'Category is required',
                      minLength: { value: 2, message: 'Should be more than 2 letters' },
                    })}
                    type="text"
                    id="productCategory"
                    placeholder="Enter Category"
                  />
                  {errors.productCategory && <p className={style.errorPara}>{errors.productCategory.message}</p>}
                </div>

                <div className={style.productThumbnail}>
                  <label htmlFor="productThumbnail">Thumbnail</label>
                  <input
                    {...register('productThumbnail', {
                      required: 'Thumbnail URL is required',
                      minLength: { value: 2, message: 'Should be more than 2 letters' },
                    })}
                    type="text"
                    id="productThumbnail"
                    placeholder="Enter image URL"
                  />
                  {errors.productThumbnail && <p className={style.errorPara}>{errors.productThumbnail.message}</p>}
                </div>

                <button className={style.submitBtn} type="submit">
                  Add Product
                </button>
              </form>
            </Typography>
          </Sheet>
        </Modal>

        <input
          type="text"
          className={style.inputBar}
          placeholder="Search your items"
          onChange={debounceCall}
        />

        <div className={style.vendorproducts}>
          {filterData.map((product, idx) => (
            <ProductCard
              key={product.id} 
              id={product.id}
              name={product.productName}
              desc={product.productDescription}
              price={product.productPrice}
              category={product.productCategory}
              img={product.productThumbnail}
              products={products}
              setProducts={(updated) => {
                const updatedAll = { ...allProducts, [vendorEmail]: updated };
                setAllProducts(updatedAll);
                setProducts(updated);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
