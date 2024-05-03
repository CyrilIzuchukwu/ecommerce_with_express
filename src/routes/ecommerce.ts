import express from "express";
import auth from "../library/middlewares/auth";
import { upload } from "../library/helpers/uploadImage";
import {
  createProduct,
  updateProduct,
  getProducts,
  getUserProducts,
  deleteSingleProduct,
  singleProduct,
} from "../controllers/ecommerceController";

const router = express.Router();

/* GET home page. */
router.post("/create_product", auth, upload.array("pictures", 6), createProduct);
router.put("/update_product/:id", auth, upload.array("pictures", 6), updateProduct);
router.get("/get_all_products", auth, getProducts);
router.get("/get_single_products/:id", auth, singleProduct);
router.get("/get_all_products/:userId", auth, getUserProducts);
router.delete("/delete_single_product/:id", auth, deleteSingleProduct);

export default router;
