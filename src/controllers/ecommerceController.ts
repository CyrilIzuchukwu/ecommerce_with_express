import { Request, Response } from "express";
import {
  creatProductSchema,
  updateProductSchema,
  option,
} from "../utils/utils";
import Ecommerce from "../model/ecommerceModel";
import User from "../model/userModel";
import { v2 as cloudinaryV2 } from "cloudinary";

export const createProduct = async (req: Request | any, res: Response) => {
  try {
    const verify = req.user;

    //validate Product form inputs
    const validateUser = creatProductSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    let links = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      // Upload images to Cloudinary and retrieve their URLs
      links = await Promise.all(
        req.files.map(async (item: Record<string, any>) => {
          const result = await cloudinaryV2.uploader.upload(item.path);
          return result.secure_url;
        })
      );
    }

    const newProduct = await Ecommerce.create({
      ...validateUser.value,
      user: verify._id,
      pictures: links,
    });

    return res
      .status(200)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { pictures, ...rest } = req.body;
    const { id } = req.params;
    //validate Product form inputs
    const validateUser = updateProductSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    const Product = await Ecommerce.findById({ _id: id });

    if (!Product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    const updateRecord = await Ecommerce.findByIdAndUpdate(
      id,
      {
        ...rest,
        pictures,
      },

      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updateRecord) {
      return res.status(404).json({
        msg: "Product not updated",
      });
    }

    return res.status(200).json({
      message: "Product updates successfully",
      updateRecord,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const getAllUserProducts = await Ecommerce.find().populate("user");

    res.status(200).json({
      msg: "Products successfully fetched",
      getAllUserProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const singleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getsingleProducts = await Ecommerce.findById(id);

    if (!getsingleProducts) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    res.status(200).json({
      msg: "Products successfully fetched",
      getsingleProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const getAllUserProducts = await Ecommerce.find({ user: user._id });

    res.status(200).json({
      msg: "Products successfully fetched",
      getAllUserProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteSingleRecord = await Ecommerce.findByIdAndDelete(id);
    if (!deleteSingleRecord) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product successfully deleted",
      deleteSingleRecord,
    });
  } catch (error) {
    console.error("Problem deleting Product");
  }
};
