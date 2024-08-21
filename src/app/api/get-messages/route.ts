import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/options.ts"; 
import { ApiResponse } from "@/types/ApiResponse";
import { Request } from "next/request";
import { dbConnect } from "@/db/index";
import Message from "@/model/message.model";

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Get the session, which contains the authenticated user's information
    const session = await getServerSession(authOptions);
    
    console.log(session)
    
    if (!session) {
      const response: ApiResponse = {
        success: false,
        message: "User is not authenticated.",
      };
      return new Response(JSON.stringify(response), { status: 401 });
    }

    // Extract the user ID from the session
    const userId = session.user?.id;

    // Fetch all messages sent to the logged-in user
    const messages = await Message.find({ to: userId }).exec();

    const response: ApiResponse = {
      success: true,
      data: messages,
      message: "Messages retrieved successfully.",
    };
    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error: any) {
    console.error("Error in message retrieval route:", error);

    const response: ApiResponse = {
      success: false,
      message: "An internal server error occurred. Please try again later.",
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
