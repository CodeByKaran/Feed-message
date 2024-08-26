import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/user.model";
import bcrypt from "bcrypt";
import { dbConnect } from "@/db/index";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        await dbConnect();
        try {
          if (!credentials) {
            throw new Error("No credentials provided");
          }

          const user = await User.findOne({
            $or: [{ email: credentials.email }, { username: credentials.email }]
          });

          if (!user) {
            throw new Error("User not registered");
          }

          const isCorrectPass = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPass) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (err) {
          console.error("Authorization error:", err);
          // Return null if there's an error to prevent malformed responses
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id.toString();
        token.email = user.email;
        token.isVerify = user.isVerify;
        token.username = user.username;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.isVerify = token.isVerify;
        session.user.username = token.username;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.avatar = token.avatar;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/api/auth/sigin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET
};
