import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Card, CardContent, CardMedia, Typography,useMediaQuery, Button, Modal, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Link , useNavigate} from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const productId = product.id;
  const isMobile = useMediaQuery('(max-width:600px)');
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 5000);
  };

  const handleViewCart = () => {
    history('/cart');
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, boxShadow: 0, border: '1px solid lightgrey', borderRadius: '20px' }}>
        <CardMedia
          component="img"
          height="180"
          image={product.thumbnail}
          alt={product.title}
          sx={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
        />
        <CardContent>
          <Link to={`/product/${productId}`} style={{ textDecoration: 'none', cursor:'pointer' }}>
            <Typography gutterBottom variant="h6" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}
            </Typography>
            <Typography variant="h6" color="primary">
              Price: ${product.price}
            </Typography>
          </Link>
          <Button
            sx={{ borderRadius: '15px',boxShadow: 0, marginTop: '5px' }}
            variant="contained"
            color="primary"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
      
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="cart-modal"
        aria-describedby="cart-options"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            borderRadius: '15px',
            textAlign: 'center',
          }}
        >
          {isMobile && (
            <>
            <DoneIcon sx={{ color: 'green', fontSize: 20 }} />
              <Typography variant="body1">Product added to cart!</Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ margin: '10px', borderRadius: '15px' }}
                onClick={handleViewCart}
              >
                View Cart
              </Button>
            </>
          )}
          {!isMobile && (
            <>
          <DoneIcon sx={{ color: 'green', fontSize: 20 }} />
          <Typography variant="body1">Product added to cart!</Typography>
          <CardMedia
            component="img"
            height="100"
            image={product.thumbnail}
            alt={product.title}
            sx={{ margin: '10px auto' }}
          />
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="h6" color="primary">
            Price: ${product.price}
          </Typography>
          <Button variant="outlined" color="primary" sx={{ margin: '10px', borderRadius: '15px' }} onClick={handleViewCart}>
            View Cart
          </Button>
          </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProductItem;
