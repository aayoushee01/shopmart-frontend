export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateCartItemQuantity = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { itemId, quantity },
});

export const removeCartItem = (itemId) => ({
  type: REMOVE_CART_ITEM,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});