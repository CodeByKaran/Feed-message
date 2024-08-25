"use client"
import React,{useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios"


interface FeedBoxProps {
  title: string;
  content: string;
  updatedAt: string;
  onRemove: (id:String) => void;
  id:string;
}

const FeedBox: React.FC<FeedBoxProps> = ({
  title,
  content,
  updatedAt,
  onRemove,
  id,
}) => {
   const [isRemoving, setIsRemoving] = useState(false);
   
  const formattedDate = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true
  }).replace(/^about /, '');
  
  const removeFeeds = async () => {
    try {
      setIsRemoving(true);
      const res = await axios.delete("/api/delete/feed", {
        data: { feedId: id }
      });
      onRemove(id)
      toast({
        title: "Success",
        description: res.data.message
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failure",
        description: error.response?.data?.message || "An error occurred."
      });
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Card className="md:max-w-sm w-[96%] p-3 m-3">
      <CardHeader className="p-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Anynmous Feedback</CardDescription>
      </CardHeader>
      <CardContent className="p-3 break-words whitespace-normal">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="p-3 flex justify-between items-end">
      <div className="flex space-x-2.5">
        <Button variant="destructive" onClick={removeFeeds}>
          {isRemoving?(
         <Loader2 className="animate-spin" />
            ):("Remove")}
        </Button>
      </div>
    <div className="text-sm text-gray-500  bottom-2 right-2 mt-5">
          {formattedDate}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedBox;
