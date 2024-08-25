"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOut from "@/components/sign-out";
import ModeToggle from "@/components/theme-toggle";

function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between md:px-10 p-3 bg-transparent backdrop-blur-[50px] sticky top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-1.5">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>KK</AvatarFallback>
        </Avatar>
        <span className="hidden md:block max-w-[120px] text-ellipsis overflow-clip self-end mb-1 font-medium">Karan</span>
      </div>
      <div className="flex items-center space-x-4">
        <SignOut />
        <ModeToggle />
      </div>
    </nav>
  );
}

export default NavBar;
