import { RootState } from '../store/store';

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
export const selectFilteredProducts = (state: RootState) => {
  const { products, selectedCategory } = state.products;
  return selectedCategory ? products.filter(p => p.category === selectedCategory) : products;
};