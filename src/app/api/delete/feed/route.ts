import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options.ts";
import { ApiResponse } from "@/types/ApiResponse";
import { dbConnect } from "@/db/index";
import Message from "@/model/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    // Get the session, which contains the authenticated user's information
    const session = await getServerSession(authOptions);

    if (!session) {
      const response: ApiResponse = {
        success: false,
        message: "User is not authenticated.",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Extract and validate the feed ID from the request
    const { feedId } = await req.json(); // Make sure the request contains JSON with `feedId`

    // Check if feedId is a valid ObjectId and convert it
    if (!mongoose.Types.ObjectId.isValid(feedId)) {
      const response: ApiResponse = {
        success: false,
        message: "Invalid feed ID.",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Convert feedId to a mongoose ObjectId
    const objectId = new mongoose.Types.ObjectId(feedId);

    // Remove the feed item from the database
    const result = await Message.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      const response: ApiResponse = {
        success: false,
        message: "Feed item not found.",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      success: true,
      message: "Feed item successfully removed.",
    };
    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error("Error in DELETE route:", error);

    const response: ApiResponse = {
      success: false,
      message: "An internal server error occurred. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
