import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: string;
    meal: string;
    price: number;
    img: string;
    instructions?: string;
    category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
