const express = require('express');
const app = express.Router();
const { 
    createWishlistItem, 
    fetchWishlistItems, 
    deleteWishlistItem,
} = require('../db/wishlist');

const { isLoggedIn, isAdmin } = require('./middleware');

//a logged in user can add an item to their wishlist
app.post('/', isLoggedIn, async(req, res, next) => {
    try {
      res.send(await createWishlistItem(req.body));
    } catch (ex) {
      next(ex)
    }
  });

//a logged in user can view their wishlist
app.get('/', isLoggedIn, async(req, res, next) => {
    try {
        res.send(await fetchWishlistItems(req.user.id))
    } catch(ex) {
        next(ex);
    }
});

//a logged in user can remove an item from their wishlist
app.delete('/:id', isLoggedIn, async(req, res, next) => {
    try {
        await deleteWishlistItem({ id: req.params.id });
        res.sendStatus(204);
    } catch (ex) {
        next(ex);
    }
});

//move item from wishlist to cart
app.put('/:id', isLoggedIn, async(req, res, next) => {
    try {
        res.send(await updateNewCart({...req.body, id: req.params.id}));
    } catch (ex) {
      next(ex);
    }
  
  })

module.exports = app;