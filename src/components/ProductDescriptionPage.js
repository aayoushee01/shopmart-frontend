import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, resetProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { useParams, useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Modal,
  Button,
  Box,
  Skeleton,
  Rating
} from '@mui/material';

const ProductDescriptionPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productById);
  const error = useSelector((state) => state.product.error);
  const [activeStep, setActiveStep] = useState(0);
  const history = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 5000);
  };

  const handleViewCart = () => {
    history('/cart');
  };
  useEffect(() => {
    dispatch(fetchProductById(productId));
    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch, productId]);

  if (!product || !Object.keys(product).length) {
    return (
      <Box display="flex" justifyContent="center"
        height="100vh" marginTop={'30px'}>
      <Container maxWidth="lg">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={6} >
            <Skeleton variant="rectangular" maxWidth={500} height={400} sx={{ borderRadius:'15px'}}/>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Grid container direction="row" spacing={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item key={item} xs={3} sm={12} >
                  <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius:'15px'}}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">
              <Skeleton width="80%" />
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Skeleton width="60%" />
            </Typography>
            <Rating name="product-rating" value={0} readOnly precision={0.5} />
            <Typography variant="h5">
              <Skeleton width="40%" />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Typography>
            <Button variant="contained"
            sx={{ borderRadius: '15px',boxShadow: 0, marginRight: '10px'}}
            color="primary" 
            onClick={() => handleAddToCart()}
            >
              Add to Cart
            </Button>
            <Button variant="outlined"
            sx={{ borderRadius: '15px',boxShadow: 0}}
            color="primary">
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Typography variant="h5">Error: {error}</Typography>
      </Container>
    );
  }

  const handleThumbnailClick = (index) => {
    setActiveStep(index);
  };

  return (
    <>
    <Box display="flex" justifyContent="center" 
    height="100vh" marginTop={'30px'}>
    <Container maxWidth="lg">
      <Grid container spacing={1} justifyContent={'center'}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 500, borderRadius: '15px', boxShadow: 0}}>
            <CardMedia
              component="img"
              height="400"
              style={{ objectFit: 'cover'}}
              image={product.images[activeStep]}
              alt={product.images[activeStep]}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Grid
            container
            direction="row"
            spacing={1}
            sx={{
              justifyContent: { xs: 'flex-start', sm: 'center' },
            }}
          >
            {product.images.map((image, index) => (
              <Grid item key={index} xs={3} sm={12}>
                <img
                  src={image}
                  alt={image}
                  style={{ width: '80px', cursor: 'pointer', borderRadius: '15px' }}
                  onClick={() => handleThumbnailClick(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} justifyContent={'center'} >
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Rating
              name="product-rating"
              value={product.rating}
              readOnly
              precision={0.5}
            />
          <Typography variant="h5" color="primary" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button variant="contained" color="primary" 
          sx={{ borderRadius: '15px',boxShadow: 0, marginRight: '10px'}}
          onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Button variant="outlined"
            sx={{ borderRadius: '15px',boxShadow: 0}}
          color="primary">
            Buy Now
          </Button>
        </Grid>
      </Grid>
    </Container>
    

    </Box>
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
          <Button variant="contained" color="primary" sx={{ borderRadius: '15px',boxShadow: 0 }}>
            Checkout
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductDescriptionPage;
