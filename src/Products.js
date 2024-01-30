import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from './SearchBar';
import { displayPrice } from './Util';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Fab, Hidden, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';


const Products = ({ products, cartItems, createLineItem, updateLineItem, isLoggedIn, isAdmin, createWishlistItem, deleteWishlistItem, isProductInWishlist }) => {
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const productCategory = queryParams.get("category");

  //to clear search as the user navigates along the menu items
  useEffect(() => {
    setSearchResults();
  }, [productCategory])

  //display search results in the page
  const showSearchResults = (searchResults) => {
    return searchResults?.length > 0 ? renderProducts(searchResults) : renderMessage();
  }

  const renderMessage = () => {
    return (
      <Card sx={{ mt: "1rem", p: "1rem", width: "50rem" }} variant="outlined">
        <Typography variant='h6'>
          There are no products that matches the search.
        </Typography>
      </Card>
    );
  }

  const renderProducts = (productsToDisplay) => {
    return productsToDisplay?.map((product, index) => {
      const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
      return (
        <Card key={product.id} sx={{ width: "14rem" }}>
          <CardMedia
            sx={{ height: "16rem", cursor: 'pointer' }}
            image={product.product_image ?? `https://source.unsplash.com/random/?${product.name}[${index}]`}
            title={"Click to view details"}
            onClick={() => { navigate(`/products/${product.id}`) }}
            loading='lazy'
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="span" sx={{ fontWeight: 700, color: 'rgba(40,40,42, .85)' }}>
              {product.name}
            </Typography>
            <Typography 
              variant="body2" 
              noWrap
            >
              {product.description}
            </Typography>
            <Typography variant="body2">
              {displayPrice.format(product.price)}
            </Typography>
            <Typography variant="caption" className="vipDiscount">
              {product.vip_price > 0 ? `${displayPrice.format(product.vip_price)}  **VIP only discount!**` : <br /> }
            </Typography>
          </CardContent>

          {
            isLoggedIn && (
              <CardActions>
                {
                  isProductInWishlist(product) ?
                    <Tooltip title="I changed my mind! Remove from Wishlist.">
                      <IconButton size="small" sx={{ color: 'accentPink.dark' }} onClick={() => { deleteWishlistItem(product) }}><FavoriteRoundedIcon /></IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="I want this cake someday! Add to Wishlist.">
                      <IconButton size="small" sx={{ color: 'accentPink.dark' }} onClick={() => { createWishlistItem(product) }}><FavoriteBorderRoundedIcon /></IconButton>
                    </Tooltip>
                }



                <Tooltip title="Add to cart!">
                  <IconButton size="small" onClick={() => { cartItem ? updateLineItem(cartItem) : createLineItem(product) }}><ShoppingCartIcon /></IconButton>
                </Tooltip>
                {
                  isAdmin && (
                    <Tooltip title="Edit Product">
                      <IconButton size="small" onClick={() => { navigate(`/products/${product.id}/edit`) }}><EditNoteIcon /></IconButton>
                    </Tooltip>
                  )
                }
              </CardActions>
            )}
        </Card>
      );
    })
  }

  //Display products based on category selected from side menu
  const showProducts = (category) => {
    let productsToDisplay;
    if (category && category !== "All Cakes") {
      productsToDisplay = products.filter((product) => {
        return (product.category === category)
      })
    } else {
      //for "all cakes" and /producs path - display all products   
      productsToDisplay = products;
    }

    const allProducts = renderProducts(productsToDisplay)
    return allProducts;
  }

  return (
    <Box>     
      <Typography variant='h4'>
        {productCategory??"All Products"}
      </Typography>
      {/* key renders new searchbar everytime the product category changes */}
      <SearchBar key={`searchbar-for-${productCategory}`} searchList={products} onSearch={(results) => { setSearchResults(results) }} />
      {
        isAdmin && (
          <Tooltip title={"Add new product"}>
            <Fab color="primary" aria-label="add" sx={{ float: 'right' }} onClick={() => navigate("/add-product")}>
              <AddIcon />
            </Fab>
          </Tooltip>
        )
      }
      <Container sx={{ display: 'flex', gap: '1rem', flexWrap: "wrap" }} maxWidth="xl">
        {
          // display order details by default. If the searchResults are available, then display only search results
          searchResults ? showSearchResults(searchResults)
            : showProducts(productCategory)
        }
      </Container>
    </Box>
  );
};

export default Products;
