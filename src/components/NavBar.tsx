"use client";
import React, { useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Link from "next/link"; // Correct import


const NavBar = () => {
  const { data: session, status } = useSession();
  const { mode, setMode } = useTheme();


  return (
    <nav className="select-none">
      <div className="w-full px-3 pr-4 py-2 flex justify-between items-center md:justify-around h-[66px]">
        <div>
          <Avatar>
            <AvatarImage src={session?.user?.avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>{session?.user?.username.slice(0,2)}</AvatarFallback>
          </Avatar>
        </div>
        <div
          className={`font-medium ${
            mode === "dark" ? "text-gray-200" : "text-slate-800"
          }`}
        >
          {status === "authenticated" ? (
            <div className="mb-1">log out</div>
          ) : status === "loading" ? (
            <Loader2
              className={`w-4 h-4 animate-spin mr-2 ${
                mode === "dark" ? "text-gray-200" : "text-slate-900"
              }`}
            />
          ) : (
            <Link href="/sign-in" className="mb-1">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
