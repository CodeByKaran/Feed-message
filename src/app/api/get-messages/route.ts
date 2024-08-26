import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options.ts";
import { ApiResponse } from "@/types/ApiResponse";
import { dbConnect } from "@/db/index";
import Message from "@/model/message.model";

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      const response: ApiResponse = {
        success: false,
        message: "User is not authenticated.",
      };
      return new Response(JSON.stringify(response), { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(session.user?._id);
    
    
    const messages = await Message.find({ to: userId });

    const response: ApiResponse = {
      success: true,
      data: messages,
      message: "Messages retrieved successfully.",
    };
    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    console.error("Error in message retrieval route:", error);

    const response: ApiResponse = {
      success: false,
      message: "An internal server error occurred. Please try again later.",
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
