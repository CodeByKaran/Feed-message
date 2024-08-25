import * as React from "react";
import { Html, Container, Section, Heading, Text, Button, Hr } from "@react-email/components";

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
  <Html>
    <Container style={containerStyle}>
      <Section style={sectionStyle}>
        <Heading style={headingStyle}>Hello, {username}</Heading>
        <Text style={textStyle}>
          Welcome to our platform! To complete your registration, please use the following verification code. This code is valid until{" "}
          <strong>{otpExpiry.toLocaleString()}</strong>:
        </Text>
        <Section style={codeContainerStyle}>
          <Text style={codeStyle}>{code}</Text>
        </Section>
        <Text style={footerTextStyle}>
          If you did not request this code, please disregard this email. For any assistance, feel free to contact our support team.
        </Text>
        <Hr style={hrStyle} />
        <Text style={footerStyle}>All rights reserved &copy; {new Date().getFullYear()} Feed - Message</Text>
      </Section>
    </Container>
  </Html>
);

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  color: "#333",
  lineHeight: "1.5",
  padding: "20px",
  maxWidth: "600px",
  margin: "auto",
};

const sectionStyle = {
  padding: "20px",
};

const headingStyle = {
  color: "#4A90E2",
  marginBottom: "20px",
};

const textStyle = {
  marginBottom: "20px",
};

const codeContainerStyle = {
  margin: "20px 0",
  padding: "10px",
  border: "1px solid #ddd",
  display: "inline-block",
  backgroundColor: "#f9f9f9",
};

const codeStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#4A90E2",
};

const footerTextStyle = {
  fontSize: "14px",
  color: "#777",
};

const hrStyle = {
  borderColor: "#ddd",
  marginTop: "40px",
};

const footerStyle = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center",
  paddingTop: "20px",
};
