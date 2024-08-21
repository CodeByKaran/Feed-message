import mongoose, { Schema, Document } from "mongoose";

export interface UserModel extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  isVerify: boolean;
  isAcceptingMessages:boolean;
  verificationOtp: number;
  verificationOtpExpiry: Date;
  role: string;
}

const userSchema: Schema<UserModel> = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'], // Custom error message
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, 'Full name is required'], // Custom error message
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Custom error message
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'], // Custom error message
    },
    avatar: {
      type: String,
      default: "",
    },
    isVerify:{
       type: Boolean,
       default: false
    },
    isAcceptingMessages:{
       type: Boolean,
       default: true,
    },
    verificationOtp: {
      type: Number,
      required: [true,"verificationOtp not found"]
    },
    verificationOtpExpiry: {
      type: Date,
      required: [true,"verificationOtpExpiry not found"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = (mongoose.models.User as mongoose.model<User>) || (mongoose.model<UserModel>("User", userSchema))



export default User;
