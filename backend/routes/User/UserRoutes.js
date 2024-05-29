const express = require("express");
const {
  auth_user_login,
  user_logout,
  user_profile,
  user_update_profile,
  auth_user_signup,
  user_add_remove_cart,
  user_cart,
  user_wishlist,
  user_add_remove_wishlist,
  user_total_cart,
  user_confirm_order,
  is_logged,
  user_item,
  user_get_item,
  user_remove_cart,
  user_get_order,
  user_success_order,
  user_fail_order,
  user_orders,
  user_table,
  user_remove_bookedTable,
  user_add_remove_bookedTable,
  user_confirm_table,
  user_tables,
  user_success_table,
  user_fail_table,
  user_get_table,
  user_get_table_id,
} = require("../../controllers/User/UserController");
const router = express.Router();
const { requireUserAuth } = require("../../middleware/authUserMiddleware");

// user profile routes
router.post("/isLogged", requireUserAuth, is_logged);
router.post("/login", auth_user_login);
router.post("/signup", auth_user_signup);
router.post("/logout", user_logout);
router
  .route("/profile")
  .get(requireUserAuth, user_profile)
  .put(requireUserAuth, user_update_profile);

// user control items
// all Items
router.post("/getItem", requireUserAuth, user_get_item);
// cart
router
  .route("/cart")
  .get(requireUserAuth, user_cart)
  .post(requireUserAuth, user_add_remove_cart);
router.post("/removeCart", requireUserAuth, user_remove_cart);
// bookTable
router
  .route("/bookTable")
  .get(requireUserAuth, user_table)
  .post(requireUserAuth, user_add_remove_bookedTable);
router.post("/removeCart", requireUserAuth, user_remove_bookedTable);
// wishlist
router
  .route("/wishlist")
  .get(requireUserAuth, user_wishlist)
  .post(requireUserAuth, user_add_remove_wishlist);
router.get("/total", requireUserAuth, user_total_cart);

router.get("/item", user_item);
router.post("/order", requireUserAuth, user_confirm_order);
router.post("/userOrders", requireUserAuth, user_orders);
router.post("/orderPaidSuccessfully", requireUserAuth, user_success_order);
router.post("/orderPaymentFail", requireUserAuth, user_fail_order);

router.post("/confirmTable", requireUserAuth, user_confirm_table);
router.get("/table", user_get_table);
router.post("/getTable", user_get_table_id);
router.post("/userTables", requireUserAuth, user_tables);
router.post("/tablePaidSuccessfully", requireUserAuth, user_success_table);
router.post("/tablePaymentFail", requireUserAuth, user_fail_table);
module.exports = router;
