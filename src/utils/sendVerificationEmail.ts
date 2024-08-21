import { SendVerificationCodeTemplate } from "../components/emails/SendVerificationCodeTemplate.tsx";
import { Resend } from "resend";
import {ApiResponse} from "@/types/ApiResponse.ts"


const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendVerificationCodeEmail(
  username: String,
  email: String,
  otp: Number,
  otpExpiry: Date
){
   
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Verification Code",
      react: SendVerificationCodeTemplate({ username, code: otp, otpExpiry })
    });

    if (error) {
      console.log("error while sending email:",error)
      return ({
         success:false,
         message:error?.toString()
      })
    }

    return ({
         success:true,
         message:"verification code send successfully!"
      })
  } catch (error) {
    console.log("email catch error:",error);
    return ({
         success:false,
         message:error?.toString()
      })
  }
}
