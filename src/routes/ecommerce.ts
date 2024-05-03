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
router.post("/create_todo", auth, upload.array("pictures", 6), createProduct);
router.put("/update_todo/:id", auth, upload.array("pictures", 6), updateProduct);
router.get("/get_all_todos", auth, getProducts);
router.get("/get_single_todos/:id", auth, singleProduct);
router.get("/get_all_todos/:userId", auth, getUserProducts);
router.delete("/delete_single_todo/:id", auth, deleteSingleProduct);

export default router;
