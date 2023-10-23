import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: null,
      cart: [],
    },
    isAuthenticated: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCart: (state, action) => {
      state.user.cart = action.payload.cart;
    },
  },
});

export const { signIn, signOut, setCart } = userSlice.actions;

export default userSlice.reducer;
