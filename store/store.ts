import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/store/slices/counterSlice";
import authSlice from "@/store/slices/authSlice";
import productsSlice from "@/store/slices/productsSlice";
import cartSlice from "@/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
