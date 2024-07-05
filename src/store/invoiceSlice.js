import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  invoice: null,
};

const invoSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {
    checkStatus: (state, action) => {
      state.invoice = action.payload;
    },
  },
});

export default invoSlice.reducer;

export const { checkStatus } = invoSlice.actions;
