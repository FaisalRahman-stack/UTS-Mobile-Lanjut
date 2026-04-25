import { create } from 'zustand';

const useFavoriteStore = create((set) => ({
  favorites: [],
  addFavorite: (meal) => set((state) => ({
    favorites: [...state.favorites, meal]
  })),
  removeFavorite: (idMeal) => set((state) => ({
    favorites: state.favorites.filter((item) => item.idMeal !== idMeal)
  }))
}));

export default useFavoriteStore;