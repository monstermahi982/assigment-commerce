import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";
import productsSlice from "@/store/slices/productsSlice";
import cartSlice from "@/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
