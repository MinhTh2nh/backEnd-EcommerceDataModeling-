const productsModelMySQL = require("../models/ProductModelMySQL");
const db = require("../config/db");
require("dotenv").config();

module.exports = {
  createProduct: (req, res) => {
    console.log(req.body.image);

    const objWithoutImage = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      productType: req.body.productType,
    };

    const obj = {
      image: req.file && req.file.path,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      productType: req.body.productType,
    };

    const producyData = obj.image === undefined ? objWithoutImage : obj;

    const insertQuery = "INSERT INTO products SET ?";

    db.query(insertQuery, producyData, (error, result) => {
      if (error) {
        return res.status(400).json(error);
      }

      return res.json({
        status: "success",
        message: "Successfully create product!",
        data: result,
      });
    });
  },

  getAllProducts: async (req, res) => {
    try {
      const sql = "SELECT * FROM products";
      db.query(sql, (err, result) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all products!",
          data: result,
        });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getProductById: async (req, res) => {
    try {
      const productID = req.params.productID;
      const sql = "SELECT * FROM products WHERE productID = ?";
      const value = [productID];
      db.query(sql, value, (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        const productData = results[0];

        return res.json({
          status: "success",
          data: productData,
        });
      });
    } catch {
      res.status(400).json({ error: "Bad Request" });
    }
  },

  editProductById: async (req, res) => {
    try {
      const productID = req.params.productID;
      const { image, name, price, description, quantity, productType } =
        req.body;

      // Validate input or perform additional checks if needed

      const updateSql =
        "UPDATE products SET image=?, name=?, price=?, description=?, quantity=?, productType=? WHERE productID=?";
      const updateValues = [
        image,
        name,
        price,
        description,
        quantity,
        productType,
        productID,
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
            message: `Product with ID ${productID} not found`,
          });
        }

        res.json({
          status: "success",
          message: `Successfully updated product with ID ${productID}!`,
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
  deleteProductController: async (req, res) => {
    try {
      const productID = req.params.productID;
      const sql = "DELETE FROM products WHERE productID =?";
      const value = [productID];
      db.query(sql, value, (err, result) => {
        res.json({
          status: "success",
          message: `Successfully delete id of ${productID} !`,
        });
      });
    } catch (err) {
      res.status(400).json(error);
    }
  },
};
