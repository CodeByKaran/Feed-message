import mongoose from "mongoose";
import User from "@/model/user.model";
import { ApiResponse } from "@/types/ApiResponse";
import { Request } from "next/request";
import { dbConnect } from "@/db/index";
import Message from "@/model/message.model";
import { MessageSchemaValidation } from "../../zod/message.zod.ts";

export async function POST(request: Request) {
  await dbConnect();

  try {
     const body = await request.json()
    
    const parsedData = MessageSchemaValidation.safeParse(body);

    if (!parsedData.success) {
      const response: ApiResponse = {
        success: false,
        message: parsedData.error.errors[0].message,
      };
      return new Response(JSON.stringify(response), { status: 422 });
    }

    const { username,title,content} = parsedData.data;
   
    const user = await User.findOne({ username });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: "The specified username does not exist.",
      };
      return new Response(JSON.stringify(response), { status: 404 });
    }

    if (!user.isAcceptingMessages) {
      const response: ApiResponse = {
        success: false,
        message: "This user is currently not accepting messages.",
      };
      return new Response(JSON.stringify(response), { status: 403 });
    }

    const message = new Message({
      to: user._id,
      title:title,
      content: content,
    });

    await message.save();

    const response: ApiResponse = {
      success: true,
      message: "Message sent successfully.",
    };
    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error: any) {
    console.error("Error in message sending route:", error);

    const response: ApiResponse = {
      success: false,
      message: "An internal server error occurred. Please try again later.",
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
