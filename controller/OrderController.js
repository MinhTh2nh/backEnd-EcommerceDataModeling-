const orderModel = require("../models/OrderModel");
const OrderDetailModel = require("../models/OrderDetailModel");
const db = require("../config/db");
require("dotenv").config();

module.exports = {
  createOrder: (req, res) => {
    const obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
      userID: req.body.userID,
      totalPrice: req.body.totalPrice,
      products: req.body.products,
      status: "Draft",
    };
    const obj2 = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
      userID: req.body.userID,
      totalPrice: req.body.totalPrice,
      status: "Draft",
    };

    const orderData = obj;
    console.log("order data: ", orderData);
    const orderData2 = obj2;
    console.log("order data: ", orderData2);
    const insertQuery = "INSERT INTO orders SET ?";

    db.query(insertQuery, orderData2, (error, result) => {
      if (error) {
        return res.status(400).json(error);
      }

      return res.json({
        status: "success",
        message: "Successfully create order!",
        data: result,
      });
    });
  },

  getAllOrder: async (req, res) => {
    try {
      const sql = "SELECT * FROM orders";
      db.query(sql, (err, result) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all orders!",
          data: result,
        });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  editOrderById: async (req, res) => {
    try {
      const orderID = req.params.orderID;
      const {
        firstName,
        lastName,
        email,
        country,
        city,
        address,
        phoneNumber,
        postalCode,
        status,
        totalPrice,
      } = req.body;

      const updateSql =
        "UPDATE orders SET firstName=?, lastName=?, email=?, country=?, city=?, address=?, phoneNumber=? , postalCode=? , status=? , totalPrice=? WHERE orderID=?";

      const updateValues = [
        firstName,
        lastName,
        email,
        country,
        city,
        address,
        updatedStatus,
        orderID,
      ];

      db.query(updateSql, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
          return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: updateErr.message,
          });
        }

        if (updateResult.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: `Order with ID ${orderID} not found`,
          });
        }

        res.json({
          status: "success",
          message: `Successfully updated Order with ID ${orderID}!`,
        });
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Bad request",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const orderID = req.params.orderID;
      const sql = "DELETE FROM orders WHERE orderID =?";
      const value = [orderID];
      db.query(sql, value, (err, result) => {
        res.json({
          status: "success",
          message: `Successfully delete id of ${orderID} !`,
        });
      });
    } catch (err) {
      res.status(400).json(error);
    }
  },
};
