"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../library/middlewares/auth"));
const uploadImage_1 = require("../library/helpers/uploadImage");
const ecommerceController_1 = require("../controllers/ecommerceController");
const router = express_1.default.Router();
router.post("/create_product", auth_1.default, uploadImage_1.upload.array("pictures", 6), ecommerceController_1.createProduct);
router.put("/update_product/:id", auth_1.default, uploadImage_1.upload.array("pictures", 6), ecommerceController_1.updateProduct);
router.get("/get_all_products", auth_1.default, ecommerceController_1.getProducts);
router.get("/get_single_products/:id", auth_1.default, ecommerceController_1.singleProduct);
router.get("/get_all_products/:userId", auth_1.default, ecommerceController_1.getUserProducts);
router.delete("/delete_single_product/:id", auth_1.default, ecommerceController_1.deleteSingleProduct);
exports.default = router;
