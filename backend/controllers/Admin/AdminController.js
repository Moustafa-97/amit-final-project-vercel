const asyncHandler = require("express-async-handler");
const { admin } = require("../../models/Admin/AdminModel");
const {user} = require( "../../models/User/UserModel")
const { oneItem } = require("../../models/Items/ItemModel");
const { rawItem } = require("../../models/Items/RawModel");
const { order } = require("../../models/Orders/OrdersModel");
const { worker } = require("../../models/Workers/WorkersModel");
const { table } = require("../../models/Table/Tables");
const { tableItem } = require("../../models/Table/TableItem");
const { GenerateAdminToken } = require("../../utils/generateAdminToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code, err);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already in use.";
    return errors;
  }
  // validation errors
  if (err.message.includes("newUser validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// ⭐
// @desc auth admin isLoged
// @desc POST /admin/isLoged
// @access Public
module.exports.is_logged = asyncHandler(async (req, res, next) => {
  res.status(200).json({ user: req.admin, state: true });
});

// @desc auth admin signup - token
// @desc POST /admin/signup
//  @access private (by login)
module.exports.auth_admin_signup = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    image,
    email,
    password,
    confirmPassword,
    theme,
  } = req.body.newAdmin;
  try {
    await admin.create({
      firstName,
      lastName,
      image,
      email,
      password,
      confirmPassword,
      theme,
    });
    res
      .status(200)
      .json({ message: "Account created successfuly", status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ message: errors, status: false });
  }
});

// @desc auth admin login - token
// @desc POST /admin/login
//  @access public
module.exports.auth_admin_login = async (req, res, next) => {
  const { email, password } = req.body.currentAdmin;
  try {
    const adminLogin = await admin.login(email, password);
    GenerateAdminToken(res, adminLogin._id);
    res.status(200).json({
      user: adminLogin,
      message: "Welcome Back",
      state: true,
    });
  } catch (err) {
    res.send(err);
  }
};

// @desc auth admin Logout - delete token
// @desc POST /admin/logout
// @access public
module.exports.admin_logout = asyncHandler(async (req, res, next) => {
  res.cookie(process.env.ADMIN_TOKEN, "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("logout");
});

// @desc auth admin profile
// @desc POST /admin/profile
// @access Private
module.exports.admin_profile = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.admin);
});

// @desc auth admin update profile
// @desc POST /admin/updateProfile
// @access Private
module.exports.admin_update_profile = asyncHandler(async (req, res, next) => {
  const loggedAdmin = await admin.findById(req.admin._id);
  if (loggedAdmin) {
    loggedAdmin.firstName = req.body.data.firstName || loggedAdmin.firstName;
    loggedAdmin.lastName = req.body.data.lastName || loggedAdmin.lastName;
    loggedAdmin.image = req.body.data.image;
    loggedAdmin.email = req.body.data.email || loggedAdmin.email;
    loggedAdmin.theme = req.body.data.theme || loggedAdmin.theme;
    if (req.body.data.password) {
      loggedAdmin.password = req.body.data.password;
      loggedAdmin.confirmPassword = req.body.data.confirmPassword;
    }
    const loggedSave = await loggedAdmin.save();
    res.status(200).json({ user: loggedSave, message: "Edited", state: true });
  } else {
    res.status(404);
    throw new Error("Admin is not found");
  }
});

// @desc auth admin get item
// @desc POST /admin/getItem
// @access Private
module.exports.admin_get_item = asyncHandler(async (req, res, next) => {
  const item = await oneItem.findById({
    _id: req.body.id,
  });
  res.status(200).json({ data: item });
});

// @desc auth admin add item
// @desc POST /admin/addItem
// @access Private
module.exports.admin_add_item = asyncHandler(async (req, res, next) => {
  const {
    itemName,
    itemDescription,
    image,
    price,
    category,
    itemQuantities,
  } = req.body.newItem;
  console.log(req.body.newItem);
  await oneItem.create({
    itemName,
    itemDescription,
    image,
    price,
    category,
    itemQuantities,
  });
  res.status(200).json("add item");
});

// @desc auth admin update item
// @desc POST /admin/updateItem
// @access Private
module.exports.admin_update_item = asyncHandler(async (req, res, next) => {
  const itemId = req.body._id;
  const itemToUpdate = await oneItem.findById({ _id: itemId });
  if (itemToUpdate) {
    itemToUpdate.itemName = req.body.data.itemName || itemToUpdate.itemName;
    itemToUpdate.itemDescription =
      req.body.data.itemDescription || itemToUpdate.itemDescription;
    itemToUpdate.image = req.body.data.image || itemToUpdate.image;
    itemToUpdate.itemQuantities =
      req.body.data.itemQuantities || itemToUpdate.itemQuantities;

    const updatedItem = await itemToUpdate.save();
    res.status(200).json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Admin is not found");
  }
});

// @desc auth admin remove item
// @desc POST /admin/removeItem
// @access Private
module.exports.admin_remove_item = asyncHandler(async (req, res, next) => {
  const itemId = req.body.id;
  await oneItem.findByIdAndDelete({ _id: itemId });
  res.status(200).json("removed");
});
// 🥄
// @desc auth admin get item
// @desc POST /admin/getItem
// @access Private
module.exports.admin_get_table = asyncHandler(async (req, res, next) => {
  const item = await tableItem.findById({
    _id: req.body.id,
  });
  res.status(200).json({ data: item });
});

// @desc auth admin add item
// @desc POST /admin/addItem
// @access Private
module.exports.admin_add_table = asyncHandler(async (req, res, next) => {
  const { itemName, itemDescription, image, price } = req.body.newItem;

  await tableItem.create({
    itemName,
    itemDescription,
    image,
    price,
  });
  res.status(200).json("add table");
});

// @desc auth admin update item
// @desc POST /admin/updateItem
// @access Private
module.exports.admin_update_table = asyncHandler(async (req, res, next) => {
  const itemId = req.body._id;
  const itemToUpdate = await tableItem.findById({ _id: itemId });
  if (itemToUpdate) {
    itemToUpdate.itemName = req.body.data.itemName || itemToUpdate.itemName;
    itemToUpdate.itemDescription =
      req.body.data.itemDescription || itemToUpdate.itemDescription;
    itemToUpdate.image = req.body.data.image || itemToUpdate.image;

    const updatedItem = await itemToUpdate.save();
    res.status(200).json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Admin is not found");
  }
});

// @desc auth admin remove item
// @desc POST /admin/removeItem
// @access Private
module.exports.admin_remove_table = asyncHandler(async (req, res, next) => {
  const itemId = req.body.id;
  await tableItem.findByIdAndDelete({ _id: itemId });
  res.status(200).json("removed");
});
// //////////////////////////

// @desc auth admin add raw
// @desc POST /admin/addRaw
// @access Private
module.exports.admin_get_raw = asyncHandler(async (req, res, next) => {
  const rawItems = await rawItem.find({});
  res.status(200).json({ raw: rawItems });
});

// @desc auth admin add raw
// @desc POST /admin/addRaw
// @access Private
module.exports.admin_add_raw = asyncHandler(async (req, res, next) => {
  const addedNewRawItem = req.body.newRawItem;
  await rawItem.create(addedNewRawItem);
  const rawItems = await rawItem.find({});
  res.status(200).json({ raw: rawItems });
});

// @desc auth admin update raw
// @desc POST /admin/updateRaw
// @access Private
module.exports.admin_update_raw = asyncHandler(async (req, res, next) => {
  const currentRawItem = req.body._id;
  const rawItemToUpdate = await rawItem.findById({ _id: currentRawItem });
  if (rawItemToUpdate) {
    rawItemToUpdate.itemName =
      req.body.data.itemName || rawItemToUpdate.itemName;
    rawItemToUpdate.quantity =
      req.body.data.quantity || rawItemToUpdate.quantity;

    await rawItemToUpdate.save();
    const rawItems = await rawItem.find({});
    res.status(200).json({ raw: rawItems });
  } else {
    res.status(404);
    throw new Error("Item is not found");
  }
});

// ✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️
// @desc auth admin update raw
// @desc POST /admin/updateRaw
// @access Private
module.exports.admin_update_raw_by_order = asyncHandler(
  async (req, res, next) => {
    const order = req.body.order;
    const orderQuantity = order.map((order) => order.order.quantity);
    const rawItems = await rawItem.find({});
    Promise.all(order.map((order) => order.order.itemDetails.itemName))
      .then(async (itemName) => {
        const item = await oneItem.find({ itemName: itemName });
        return item;
      })
      .then((item) => {
        Promise.all(item.map((item) => item.itemQuantities)).then(
          (itemQuantities) => {
            rawItems.map((raw) => {
              const quantity = itemQuantities
                .map((item) => (item[raw.itemName] ? item[raw.itemName] : 0))
                .map((num, index) => num * orderQuantity[index])
                .reduce((a, b) => a + b, 0);
              raw.Count -= quantity;
              return raw.save();
            });
          }
        );
      });
  }
);

// @desc auth admin remove raw
// @desc POST /admin/removeRaw
// @access Private
module.exports.admin_remove_raw = asyncHandler(async (req, res, next) => {
  const rawItemId = req.body._id;
  await rawItem.findByIdAndDelete({ _id: rawItemId });
  res.status(200).json("removed from raw");
});

// @desc auth admin add worker
// @desc POST /admin/addWorker
// @access Private
module.exports.admin_add_worker = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    image,
    email,
    password,
    confirmPassword,
    theme,
  } = req.body.newWorker;
  try {
    await worker.create({
      firstName,
      lastName,
      image,
      email,
      password,
      confirmPassword,
      theme,
    });
    res
      .status(200)
      .json({ message: "Worker account created successfuly", status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ message: errors, status: false });
  }
});

// @desc auth admin watch orders
// @desc POST /admin/orders
// @access Private
module.exports.admin_remove_worker = asyncHandler(async (req, res, next) => {
  const workerId = req.body._id;
  await worker.findByIdAndDelete({ _id: workerId });
  res.status(200).json("Worker removed");
});

// @desc auth admin orders
// @desc POST /admin/userOrders
// @access Private
module.exports.admin_confirmed_orders = asyncHandler(async (req, res, next) => {
  const item = await order.find({});
  Promise.all(
    item.map(
      async (ids) =>
        await stripe.checkout.sessions.retrieve(`${ids._sessionId}`)
    )
  )
    .then(async (orders) => {
      const sessionsId = orders.map((ids) => ids.id);
      const sessionsPs = orders.map((ids) => ids.payment_status);
      const updateOrders = async (ids, values) => {
        try {
          const orders = await order.find({ _sessionId: { $in: ids } });
          orders.forEach((order, index) => {
            order.payment = values[index];
            order.save();
          });
        } catch (err) {
          console.log(err);
        }
      };

      updateOrders(sessionsId, sessionsPs);
    })
    .then(async () => {
      const newResult = await order.find({});
      res.status(200).json({
        data: newResult,
      });
    });

  return;
});

// @desc auth admin refuse orders
// @desc POST /admin/refuseUserOrders
// @access Private
module.exports.admin_refuse_orders = asyncHandler(async (req, res, next) => {
  await order.findByIdAndDelete({ _id: req.body.id });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});

// @desc auth admin accept orders
// @desc POST /admin/acceptUserOrders
// @access Private
module.exports.admin_accept_orders = asyncHandler(async (req, res, next) => {
  await order.findByIdAndUpdate({ _id: req.body.id }, { accepted: true });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});
// @desc auth admin accept orders
// @desc POST /admin/acceptUserOrders
// @access Private
module.exports.admin_serve_orders = asyncHandler(async (req, res, next) => {
  await order.findByIdAndUpdate({ _id: req.body.id }, { served: true });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});

// 🥄
// @desc auth admin orders
// @desc POST /admin/userOrders
// @access Private
module.exports.admin_confirmed_tables = asyncHandler(async (req, res, next) => {
  const item = await table.find({});
  Promise.all(
    item.map(
      async (ids) =>
        await stripe.checkout.sessions.retrieve(`${ids._sessionId}`)
    )
  )
    .then(async (tables) => {
      const sessionsId = tables.map((ids) => ids.id);
      const sessionsPs = tables.map((ids) => ids.payment_status);
      const updateTables = async (ids, values) => {
        try {
          const tables = await table.find({ _sessionId: { $in: ids } });
          tables.forEach((table, index) => {
            table.payment = values[index];
            table.save();
          });
        } catch (err) {
          console.log(err);
        }
      };

      updateTables(sessionsId, sessionsPs);
    })
    .then(async () => {
      const newResult = await table.find({});
      res.status(200).json({
        data: newResult,
      });
    });

  return;
});

// @desc auth admin refuse orders
// @desc POST /admin/refuseUserOrders
// @access Private
module.exports.admin_refuse_tables = asyncHandler(async (req, res, next) => {
  await table.findByIdAndDelete({ _id: req.body.id });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});

// @desc auth admin accept orders
// @desc POST /admin/acceptUserOrders
// @access Private
module.exports.admin_accept_tables = asyncHandler(async (req, res, next) => {
  await table.findByIdAndUpdate({ _id: req.body.id }, { accepted: true });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});

// @desc auth admin accept orders
// @desc POST /admin/acceptUserOrders
// @access Private
module.exports.admin_serve_tables = asyncHandler(async (req, res, next) => {
  await table.findByIdAndUpdate({ _id: req.body.id }, { served: true });
  const newResult = await order.find({});
  res.status(200).json({ data: newResult });
});

// @desc auth admin accept orders
// @desc POST /admin/acceptUserOrders
// @access Private
module.exports.admin_get_users = asyncHandler(async (req, res, next) => {
  const newResult = await user.find({});
  res.status(200).json({ data: newResult });
});
