import mongoose from "mongoose";

interface EcommerceType {
  [key: string]: string | boolean | Array<string>;
}

const ecommerceSchema = new mongoose.Schema(
  {
    item_name: { type: String},
    category: { type: String },
    price: { type: String},
    description: { type: String },
    pictures: { type: String},
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ecommerce = mongoose.model<EcommerceType>("ecommerce", ecommerceSchema);

export = Ecommerce;
