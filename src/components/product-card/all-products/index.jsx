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


export default function AllProducts({ name, desc, price, category, img,products,setProducts,id }) {

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

        <Button variant="solid" color="danger" size="lg" onClick={()=>deleteProduct(id)}>
          Add to Cart
        </Button>

      </CardContent>
    </Card>
  );
}


