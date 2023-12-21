module.exports = (sequenlize, DataTypes) => {
  const OrderModelSQL = sequenlize.define("order", {
    image: {
      type: DataTypes.STRING,
      default: "public/productImages/default-product-image.jpg",
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    price: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
      required: true,
    },
    productType: {
      type: DataTypes.STRING,
      required: true,
    },
    status: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  return OrderModelSQL;
};
