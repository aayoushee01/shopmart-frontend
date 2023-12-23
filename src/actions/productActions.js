export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_BY_ID_FAILURE = 'FETCH_PRODUCT_BY_ID_FAILURE';
export const RESET_PRODUCT_BY_ID= 'RESET_PRODUCT_BY_ID';

const BACKEND_URL = process.env.BACKEND_URL || "https://shopmart-backend.onrender.com/api";
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});
export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => async (dispatch) => {
  try {
    console.log("Fetching products...");
    const response = await fetch(`${BACKEND_URL}/products/`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    console.log("Fetching products...");
    const response = await fetch(`${BACKEND_URL}/products/${productId}/`);
    const data = await response.json();
    console.log(data);
    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
export const resetProduct = () => async (dispatch) => {
  try {
    console.log("Resetting product...");
    dispatch({
      type: RESET_PRODUCT_BY_ID,
    });
  } catch (error) {
    dispatch({
      type: RESET_PRODUCT_BY_ID,
    });
  }
};

