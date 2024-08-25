import React from "react";
import { Button } from "@/components/ui/button";
import EmptyFeed from "../assets/emptyFeed.svg"
import Image from "next/image"

const NoFeedsMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] p-4 text-center">
      <Image src={EmptyFeed} hieght={80} widht={80}/>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
        No Feeds Available
      </h2>
      <p className="text-gray-500 mb-4">
        It looks like there are no feeds to display right now. Please check back later or add new feeds.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};

export default NoFeedsMessage;
