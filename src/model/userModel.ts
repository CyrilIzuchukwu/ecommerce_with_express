import mongoose from "mongoose";

interface UserType {
  [key: string]: string | boolean | Array<string>;
}

const userSchema = new mongoose.Schema(
  {
    fullname: {type: String}, 
    email: {type: String}, 
    password: {type: String}, 
    profile_picture: {type: String}, 
    phone_number: {type: String}, 
    country: {type: String},  
    ecommerce: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecommerce"
      }
    ]

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>('User', userSchema)

export = User;