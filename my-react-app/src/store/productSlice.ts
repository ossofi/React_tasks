import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  category: string;
  instructions?: string;
}

interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.categories = Array.from(new Set(action.payload.map(p => p.category)));
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setProducts, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
