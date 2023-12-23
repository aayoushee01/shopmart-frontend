import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import ProductItem from './ProductItem';
import { Box, Grid, Skeleton } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { loading, loaded } = products;

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchProducts());
    }
  }, [dispatch, loaded]);

  if (loading || !loaded || !products) {
    return (
      <Box display="flex" justifyContent="center" mt="50px">
        <Grid container spacing={4} width="80vw">
          {[...Array(15).keys()].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item} >
              <Skeleton variant="rectangular" width={300} height={320} sx={{ borderRadius: '15px'}} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt="50px">
      <Grid container spacing={4} width="80vw">
        {!loading &&
          products &&
          products.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductItem key={product.id} product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
