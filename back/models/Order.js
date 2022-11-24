const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        productQuantity: {
          type: Number,
        },
        productColor: { type: Array, optional: true },
        productSize: { type: Array, optional: true },
      },
    ],
    amount: { type: Number, required: true },
    userInfo: {
      name: { type: String },
      address: { type: Object, required: true },
      phone: { type: Number, required: true },
    },
    methodInfo: { type: Object, required: true },
    status: { type: String, default: "pending" },
    orderCode: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
