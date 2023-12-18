const db = require("../config/db");
require("dotenv").config();

module.exports = {
  createOrder: (req, res) => {
    const {
      firstName,
      lastName,
      email,
      country,
      city,
      address,
      phoneNumber,
      postalCode,
      products,
      customerId,
      productId,
    } = req.body;

    const customer = "SELECT * FROM users WHERE userID=?";

    db.query(customer, [customerId], (customerError, customerResults) => {
      if (customerError) {
        console.error("Error fetching customer:", customerError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (customerResults.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const product = "SELECT * FROM products WHERE productID =?";
      db.query(product, [productId], (productError, productResults) => {
        if (productError) {
          console.error("Error fetching product:", productError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (productResults.length === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        
      });
    });
  },
};
