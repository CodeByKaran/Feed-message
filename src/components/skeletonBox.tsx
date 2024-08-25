import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SkeletonBox = () => {
  return (
    <Card className="max-w-sm w-[90%] p-3 animate-pulse m-3">
      <CardHeader className="p-3">
        <CardTitle className="bg-gray-300 h-6 rounded-md w-3/4"></CardTitle>
        <div className="bg-gray-200 h-4 rounded-md w-1/4 mt-2"></div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="bg-gray-200 h-4 rounded-md w-full mb-2"></div>
        <div className="bg-gray-200 h-4 rounded-md w-5/6"></div>
      </CardContent>
      <CardFooter className="p-3 flex justify-between items-end">
        <div className="bg-gray-200 h-8 rounded-md w-24"></div>
        <div className="bg-gray-200 h-8 rounded-md w-24"></div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonBox;
