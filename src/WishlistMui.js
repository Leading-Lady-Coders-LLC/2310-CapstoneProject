import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { displayPrice } from './Util';
import { Card, CardActions, CardContent, CardMedia, Container, Fab, IconButton, Tooltip, Typography, ImageList, ImageListItem, Snackbar, } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const WishlistMui = ({ wishlistItems, products, cartItems, getCartItem, createLineItem, updateLineItem, deleteWishlistItem }) => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const productIdArray = wishlistItems?.map((wishlistItem) => {
    return wishlistItem.product_id;
  })

  //use the product ids to create an array of the wishlist products
  const wishlistProducts = products?.filter((product) => {
    return productIdArray.includes(product.id)
  })

  console.log(wishlistProducts)

  const handleAddToCart = (product) => {
    const cartItem = getCartItem(product.id);
    //add item to cart
    cartItem ? updateLineItem(cartItem) : createLineItem(product)
    //remove item from wishlist
    deleteWishlistItem(product)

    // show toast notification
    setShowToast(true);
    setToastMessage("Product moved to cart.")
  }

  const handleDeleteWishlistItem = (product) => {
    //delete item from wishlist
    deleteWishlistItem(product)
    // show toast notification
    setShowToast(true);
    setToastMessage("Product removed from wishlist.")
  }

  const handleClose = () => {

    setShowToast(false);
    setToastMessage("");
  }

  return (
    <Card>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      // key={product.id}
      />
      <ImageList cols={3}>
        
        {wishlistProducts?.length ?
          wishlistProducts.map((product) => (
            <ImageListItem key={product.name}>
              <img
                // srcSet={`https://source.unsplash.com/random/?${product.name}[${index}]?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${product.product_image}`}
                alt={product.name}
                loading="lazy"
              />

              <ImageListItemBar
                sx={{ backgroundColor: "rgba(255,255,255,0.8)", "& .MuiImageListItemBar-title": { color: "black" }, "& .MuiImageListItemBar-subtitle": { color: "black" } }}
                title={product.name}
                subtitle={product.category}
                actionIcon={
                  <>
                    <Tooltip title="I changed my mind! Remove from Wishlist.">
                      <IconButton size="small" sx={{ color: 'accentPink.dark' }} onClick={() => { handleDeleteWishlistItem(product) }}><FavoriteRoundedIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Add to cart!" >
                      <IconButton size="small" onClick={() => handleAddToCart(product)}><ShoppingCartIcon /></IconButton>
                    </Tooltip>
                  </>
                }
              />
            </ImageListItem>
          ))
          :
          <Card sx={{ mt: "1rem", p: "1rem" }} >
            <Typography>
              There are no items in your wishlist.
            </Typography>
          </Card>
        }
      </ImageList></Card>
  );
}
export default WishlistMui
