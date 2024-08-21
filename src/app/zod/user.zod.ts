import { z } from "zod";

// Username validation schema
export const usernameSchemaValidation = z
  .string()
  .min(6, "Username must be at least 6 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[a-z0-9_@]+$/,
    "Username can only contain lowercase letters, numbers, underscores, and the '@' symbol"
  );
  
 
export const verificationOtpSchemaValidation = z.string().min(6,"minmum 6 pins required").max(6,"maxium allowed pin is 6")



// User validation schema
export const UserSchemaValidation = z.object({
  username: usernameSchemaValidation, // Reusing the usernameSchema
  fullname: z.string().min(1, "Full name is required").max(20,"fullname must be at most 50 characters long").trim(),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),
  password: z.string().min(6, "password at least of 6 characters"),
  avatar: z.string().url().optional(),
  verificationOtp: z.number().optional(),
  verificationOtpExpiry: z.date().optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

export const UserSignInValidation= z.object({
   email: z
    .string()
    .email("Invalid email format"),
   password: z.string().min(6, "password at least of 6 characters")
})

// Type inference for UserSchema
export type UserSchemaValidationType = z.infer<typeof UserSchemaValidation>;
