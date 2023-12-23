import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import {
  updateCartItemQuantity,
  removeCartItem,
} from '../actions/cartActions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.product.price * currentItem.quantity,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity(itemId, newQuantity));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Box display="flex" justifyContent="center" mt="50px">
          <Grid container spacing={3} maxWidth={'75vw'}>
            {cartItems.map((item) => (
              <Grid item key={item.product.id} xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={2}>
                        <CardMedia
                          component="img"
                          height="50"
                          image={item.product.thumbnail}
                          alt={item.product.title}
                          style={{ width: '80px', borderRadius: '15px' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography variant="subtitle1">
                          {item.product.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body2" color="textSecondary">
                          Quantity:  &nbsp;&nbsp;&nbsp;&nbsp;
                          <IconButton
                            aria-label="Reduce quantity"
                            onClick={() =>
                              handleQuantityChange(item.product.id, Math.max(item.quantity - 1, 1))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            aria-label="Increase quantity"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body1">
                          Total: ${item.product.price * item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Typography variant="h6">Total: ${total}</Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" color="primary">
                  Proceed to Checkout
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CartView;
