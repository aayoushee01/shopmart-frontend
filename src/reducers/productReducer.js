const initialState = {
  products: [],
  loading: false,
  loaded: false,
  error: null,
  productById:{},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.payload ,
        error: null,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };
    case 'FETCH_PRODUCT_BY_ID_FAILURE':
      return {
        ...state,
        productById: {},
        error: action.payload,
      };
    case 'FETCH_PRODUCT_BY_ID_SUCCESS':
      return {
        ...state,
        productById: action.payload,
        error: null,
      };
    case 'RESET_PRODUCT_BY_ID':
      return {
        ...state,
        productById: {},
        error: null,
      };
    default:
      return state;
  }
};

export default productReducer;
