import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manage: "Orders",
};
const ThisCurrentManageSection = createSlice({
  name: "CurrentManageSection",
  initialState,
  reducers: {
    CurrentManageSection: (state, action) => {
      state.manage = action.payload;
    },
  },
});
export const { CurrentManageSection } = ThisCurrentManageSection.actions;

export default ThisCurrentManageSection.reducer;
