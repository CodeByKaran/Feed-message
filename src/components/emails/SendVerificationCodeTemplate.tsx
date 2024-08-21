import * as React from "react";

interface EmailTemplateProps {
  username: string;
  code: number;
  otpExpiry: Date;
}

export const SendVerificationCodeTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  code,
  otpExpiry,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", padding: "20px", maxWidth: "600px", margin: "auto" }}>
    <h1 style={{ color: "#4A90E2", marginBottom: "20px" }}>Hello, {username}</h1>
    <p>
      Welcome to our platform! To complete your registration, please use the following verification code. This code is valid until{" "}
      <strong>{otpExpiry.toLocaleString()}</strong>:
    </p>
    <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ddd", display: "inline-block", backgroundColor: "#f9f9f9" }}>
      <span style={{ fontSize: "24px", fontWeight: "bold", color: "#4A90E2" }}>{code}</span>
    </div>
    <p style={{ fontSize: "14px", color: "#777" }}>
      If you did not request this code, please disregard this email. For any assistance, feel free to contact our support team.
    </p>
    <footer style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "20px", fontSize: "12px", color: "#999", textAlign: "center" }}>
      <p>All rights reserved &copy; {new Date().getFullYear()} Feed - Message</p>
    </footer>
  </div>
);
