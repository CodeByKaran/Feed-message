import mongoose from "mongoose";
import User from "@/model/user.model";
import { ApiResponse } from "@/types/ApiResponse";
import { Request } from "next/request";
import { dbConnect } from "@/db/index";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { otp, id } = await request.json();

    if (!otp || !id) {
      const response: ApiResponse = {
         success:false,
         message:"credentials not given"
      };
      return Response.json(response,{status:404})
    }
    
    const userObjectId = new mongoose.Types.ObjectId(id)
    
    const user = await User.findById(userObjectId)
    
    if(!user){
      const response: ApiResponse = {
         success:false,
         message:"invalid credentials"
      };
      return Response.json(response,{status:409})
    }
    
    if(user.isVerify){
      const response: ApiResponse = {
         success:false,
         message:"user is already verified"
      };
      return Response.json(response,{status:301})
    }
    
    const isOtpCorrect = user.verificationOtp === Number(otp)
    
    if(!isOtpCorrect){
       const response: ApiResponse = {
         success:false,
         message:"incorrect otp"
      };
      return Response.json(response,{status:402})
    }
    
    const isValidOtp = user.verificationOtpExpiry > new Date()
    
    if(!isValidOtp){
      const response: ApiResponse = {
         success:false,
         message:"otp is expired"
      };
      return Response.json(response,{status:300})
    }
    
    user.isVerify = true;
    await user.save();
    
    const response: ApiResponse = {
         success:true,
         message:"verified successfully"
      };
      return Response.json(response,{status:200})
    
  } catch (error) {
    console.error("verify route error:", error);

    const response: ApiResponse = {
      success: false,
      message: "An error occurred during verify. Please try again later."
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
