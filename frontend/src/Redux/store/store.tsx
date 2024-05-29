import { configureStore } from "@reduxjs/toolkit";
import WishlistandWatchlist from "../reduxTools/WishlistandWatchlist";
import SnackbarHandler from "../reduxTools/SnackbarHandler";
import HandleUserLogin from "../reduxTools/HandleUserLogin";
import CurrentCategory from "../reduxTools/CategoryHandler";
import CurrentManageSection from "../reduxTools/ManageHandler";
import CartManageSection from "../reduxTools/CartManageHandler";

export default configureStore({
  reducer: {
    userlist: WishlistandWatchlist,
    snackbar: SnackbarHandler,
    Login: HandleUserLogin,
    category: CurrentCategory,
    manage: CurrentManageSection,
    cartManage: CartManageSection,
  },
});
