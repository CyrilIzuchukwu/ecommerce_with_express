"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const ecommerceSchema = new mongoose_1.default.Schema({
    item_name: { type: String },
    category: { type: String },
    price: { type: String },
    description: { type: String },
    pictures: [{ type: String }],
    user: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
const Ecommerce = mongoose_1.default.model("ecommerce", ecommerceSchema);
module.exports = Ecommerce;
