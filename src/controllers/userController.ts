import { Request, Response } from "express";
import { RegisterSchema, option, LoginSchema } from "../utils/utils";
import User from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET as string;

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const profile_picture = req.body.profile_picture;
    const confirm_password = req.body.confirm_password;
    const phone_number = req.body.phone_number;
    const country = req.body.country;

    //validate user

    const validateUser = RegisterSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    // Hashing password
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));

    const user = await User.findOne({ email: email });

    if (!user) {
      const newUser = await User.create({
        fullname,
        email,
        password: passwordHash,
        profile_picture,
        phone_number,
        country,
      });
      return res.status(200).json({
        message: "Registtration Successful",
        data: newUser,
      });
    }
    //email
    //token

    res.status(400).json({
      message: "User already exixt",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //validate user

    const validateUser = LoginSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    //Verify if user exist
    const user = (await User.findOne({
      email: email,
    })) as unknown as { [key: string]: string };

    if (!User) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const { _id } = user;

    //generate token
    const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "30d" });

    //compare password
    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      return res.status(200).json({
        msg: "Login Successful",
        user,
        token,
      });
    }
    return res.status(400).json({
      error: "Invalid password",
    });
  } catch (error) {
    console.error("Something went wrong login in");
  }
};
