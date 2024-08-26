import User from "@/model/user.model";
import bcrypt from "bcrypt";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendVerificationOtpEmail } from "@/utils/sendVerificationOtpEmail";
import { UserSchemaValidation } from "../../zod/user.zod.ts";
import { dbConnect } from "@/db/index";

export async function POST(request: Request): Promise<Response> {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate request body with Zod
    const parsedData = UserSchemaValidation.safeParse(body);

    if (!parsedData.success) {
      const response: ApiResponse = {
        success: false,
        message: parsedData.error.errors[0].message
      };
      return new Response(JSON.stringify(response), { status: 400 });
    }

    const { username, password, email, fullname } = parsedData.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    // Generate OTP and expiry
    const verificationOtp = Math.floor(100000 + Math.random() * 900000);
    const verificationOtpExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    let user;

    if (existingUser) {
      if (!existingUser.isVerify) {
        // Update existing user with new data and OTP
        user = await User.findOneAndUpdate(
          { email },
          {
            fullname,
            username,
            password: await bcrypt.hash(password, 10),
            verificationOtp,
            verificationOtpExpiry
          },
          { new: true } // Return the updated document
        );
      } else {
        const response: ApiResponse = {
          success: false,
          message: "User already exists with these credentials."
        };
        return new Response(JSON.stringify(response), { status: 409 });
      }
    } else {
      // Create a new user
      user = new User({
        fullname,
        username,
        email,
        password: await bcrypt.hash(password, 10),
        verificationOtp,
        verificationOtpExpiry
      });
    }

    // Send verification email
    const isEmailSent = await sendVerificationOtpEmail(
      username,
      email,
      verificationOtp,
      verificationOtpExpiry
    );

    if (isEmailSent.success) {
      await user.save(); // Save user data if email is sent successfully
      const response: ApiResponse = {
        success: true,
        message: "Verification code sent to email. Please verify."
      };
      return new Response(JSON.stringify(response), { status: 201 });
    } else {
      const response: ApiResponse = {
        success: false,
        message: "Error while sending email. Please try again later."
      };
      return new Response(JSON.stringify(response), { status: 500 });
    }
  } catch (error) {
    console.error("Sign-up route error:", error);

    const response: ApiResponse = {
      success: false,
      message: "An error occurred during sign-up. Please try again later."
    };
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
