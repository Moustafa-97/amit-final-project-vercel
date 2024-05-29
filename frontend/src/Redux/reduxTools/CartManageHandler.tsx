import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manage: "Items",
};
const ThisCartManageSection = createSlice({
  name: "CartManageSection",
  initialState,
  reducers: {
    CartManageSection: (state, action) => {
      state.manage = action.payload;
    },
  },
});
export const { CartManageSection } = ThisCartManageSection.actions;

export default ThisCartManageSection.reducer;
