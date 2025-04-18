import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useDispatch, useSelector } from 'react-redux';
import {add,remove} from '../../../redux/slices/cart-slice'
import style from './style.module.css'

export default function CartProducts({name,desc,price,category,img,product,id}) {

      const {cart} = useSelector((state)=>state);
      const dispatch = useDispatch();

      const removeFromCart = ()=>{

        console.log("current product: ",id);
        dispatch(remove(product.index));
        alert('Item Removed to Card');
      }

    return (

        <div>
            <Card sx={{
                width: 320, maxWidth: '100%', boxShadow: 'lg',
                overflow: 'hidden', cursor: 'context-menu'
            }}
                className={style.products}>

                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200, height: '' }}>
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

                    <Button className={style.margin} variant="solid" color="danger" size="lg" onClick={removeFromCart} >
                        Remove from Cart
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}
