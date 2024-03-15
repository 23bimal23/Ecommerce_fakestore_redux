import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number,
  price: number,
  image: string,
  title: string,
  quantity: number,
  
}
export interface CartState {
  cartItems: CartItem[];
}
const initialState: CartState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseCartQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        price: number;
        image: string;
        title: string;
     
      }>
    ) => {
      const { id, price, image, title } = action.payload;
      const existingItem = state.cartItems.find((item) => 
        item.id === id &&
          item.price === price &&
          item.title === title &&
          item.image === image 
          
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ id, price, title, image, quantity: 1 });
      }
    },
    decreaseCartQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        price: number;
        image: string;
        title: string;
      
      
      }>
    ) => {
      const { id, price, image, title} = action.payload;
      const existingItem = state.cartItems.find((item) => 
        item.id === id &&
          item.price === price &&
          item.title === title &&
          item.image === image  
        
      );

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => 
            item.id !== id ||
              item.price !== price ||
              item.title !== title ||
              item.image !== image  
          
          );
        }
      }
    },
    removeCartQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        price: number;
        image: string;
        title: string;
      
      
      }>
    ) => {
      const { id, price, image, title } = action.payload;
      state.cartItems = state.cartItems.filter((item) => 
        item.id !== id ||
          item.price !== price ||
          item.title !== title ||
          item.image !== image  
        
      );
    },
  },
});
export const {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
