import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {add,remove} from '../../../redux/slices/cart-slice'
import { v4 as uuidv4 } from 'uuid';


export default function AllProducts({ name, desc, price, category, img,id, product }) {

  const {cart} = useSelector((state)=>state);
  const dispatch = useDispatch();

  const addToCart = () => {
    const productWithId = {
      ...product, 
      id: uuidv4(),
    };
    console.log("Adding product with ID:", productWithId.id);
    dispatch(add(productWithId)); 
    alert('Item Added to Cart');
  };

  const removeFromCart = () => {
    const itemInCart = cart.find((item) => 
      item.productName === product.productName &&
      item.productDescription === product.productDescription &&
      item.productPrice === product.productPrice
    );
  
    if (!itemInCart) {
      console.error("Product not found in cart");
      return;
    }
  
    console.log("Removing product with ID:", itemInCart.id);
    dispatch(remove(itemInCart.id)); 
    alert('Item Removed from Cart');
  };

  return (
    
    <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' , 
    overflow:'hidden', cursor:'context-menu'}}
    className={style.products}>
      
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 , height:''}}>
          <img
            src={img}
            loading="lazy"
            alt=""
          />
        </AspectRatio>

      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{name}</Typography>
        <Link
          href="#product-card"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
          sx={{ fontWeight: 'md' }}
        >
          {desc}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          Rs {price}
        </Typography>

        <Typography level="body-sm">
          ({category})
        </Typography>

        <Button className={style.margin} variant="solid" color="danger" size="lg" onClick={addToCart} >
          Add to Cart
        </Button>

        <Button size="lg" onClick={removeFromCart} >
          Remove From Cart
        </Button>

      </CardContent>
    </Card>
  );
}


