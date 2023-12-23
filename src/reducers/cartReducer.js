const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { product: action.payload, quantity: 1 },
          ],
        };
      }

    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
