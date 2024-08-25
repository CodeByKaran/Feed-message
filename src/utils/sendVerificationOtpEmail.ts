import nodemailer from "nodemailer";
import { render } from "@react-email/components";

import { SendVerificationCodeTemplate } from "../components/emails/SendVerificationCodeTemplate.tsx";

const sendVerificationOtpEmail = async (
  username: String,
  email: String,
  otp: Number,
  otpExpiry: Date
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASS
      }
    });

    const emailHtml = await render(
      SendVerificationCodeTemplate({ username, code: otp, otpExpiry })
    );

    const data = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification Otp",
      html: emailHtml
    });

    console.log("Message", data);
   
    if(data.messageId){
      return ({
        success: true,
        message:"email sent successfully"
      }); 
    }else{
      return ({
        success: false,
        message:"email sending error!"
      }); 
    }

    
  } catch (error) {
    console.log("sending mail error", error);
    return ({
        success: false,
        message:"email sending error!"
      }); 
  }
};

export { sendVerificationOtpEmail };
