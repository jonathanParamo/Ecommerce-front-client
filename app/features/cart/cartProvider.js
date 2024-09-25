import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * product.price;
      } else {
        state.push({
          ...product,
          quantity: 1,
          totalPrice: product.price
        });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;

      return state.filter(product => product._id !== productId);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.find((item) => item._id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.find((item) => item._id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
        } else {
          return state.filter(item => item.id !== productId);
        }
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
