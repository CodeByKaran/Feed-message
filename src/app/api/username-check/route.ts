import mongoose from "mongoose";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/db/index";
import { usernameSchemaValidation } from "../../zod/user.zod";
import User from "@/model/user.model";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    // Extract the username from the query parameters
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    // Check if username is provided
    if (!username) {
      const response: ApiResponse = {
        success: false,
        message: "Username query parameter is required"
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate the username using Zod schema
    const validation = usernameSchemaValidation.safeParse(username);

    if (!validation.success) {
      const response: ApiResponse = {
        success: false,
        message: validation.error.errors[0].message
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if the username exists in the database
    const user = await User.findOne({ username });

    if (!user || !user.isVerify) {
      const response: ApiResponse = {
        success: true,
        message: "Username is unique"
      };
      return NextResponse.json(response, { status: 200 });
    } else {
      const response: ApiResponse = {
        success: false,
        message: "Username is already taken"
      };
      return NextResponse.json(response, { status: 409 });
    }
  } catch (err: any) {
    console.log("Error occurred during checking if username is unique", err);
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong"
    };
    return NextResponse.json(response, { status: 500 });
  }
}
