import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: null,
    },
    isAuthenticated: false,
    cart: [],
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.cart = [] || JSON.parse(localStorage.getItem("cart"));
    },
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { signIn, signOut, setCart } = userSlice.actions;

export default userSlice.reducer;
