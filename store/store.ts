import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";
import productsSlice from "@/store/slices/productsSlice";
import cartSlice from "@/store/slices/cartSlice";
import loaderSlice from "@/store/slices/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
    loader: loaderSlice
  },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
