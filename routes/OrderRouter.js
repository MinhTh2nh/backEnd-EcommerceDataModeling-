var express = require("express");
var router = express.Router();
const orderController = require("../controller/OrderController");
const { validateAdmin, validateUser } = require("../validator/UsersValidator");

//For the MongoDB database -- Start Here
router.post("/create", orderController.createOrder);
router.put("/edit/:orderID", orderController.editOrderById);
router.get("/getAll", orderController.getAllOrder);
router.delete("/delete/:orderID", validateAdmin, orderController.deleteById);
//For the MongoDB database -- End Here




module.exports = router;
