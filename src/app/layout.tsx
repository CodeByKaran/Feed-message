"use client"
import React, { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/SessionProvider";
import ThemeProvider from "@/context/ThemeProvider";
import {useTheme} from "../context/ThemeProvider.tsx"

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
   
   const {mode} = useTheme()
   
   
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Feed - Message</title>
      </head>
      <body className={`${
         mode=="dark"?"bg-[#0a0a0a]":"bg-blue-500"
      }`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
