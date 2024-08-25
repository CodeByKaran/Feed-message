"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { Check, Clipboard } from 'lucide-react';
import {Button} from "@/components/ui/button"



const PublicUrl = () => {
   const { data: session } = useSession();
   const [copied, setCopied] = useState(false);
   
   const siteUrl = `${window.location.protocol}//${window.location.host}/feed/${session?session?.user?.username:"..."}`;
 

   const handleCopy = () => {
      navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="max-w-sm w-[98%] p-3 flex justify-between items-center text-sm rounded border-r-2 border-r-red-500 dark:bg-[#171a24] bg-[#eaeae8] overflow-x-auto">
         <pre className="overscroll-x-auto">
            <code className="">
               {siteUrl}
            </code>
         </pre>
         <Button 
            variant="ghost"
            onClick={handleCopy} 
            className="p-1 h-fit"
         >
            {copied ? <Check size={16} /> : <Clipboard size={16} />}
         </Button>
      </div>
   )
}

export default PublicUrl;
