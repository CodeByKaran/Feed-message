"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { MessageSchemaValidation } from "../../zod/message.zod.ts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; 
import axios from "axios"
import {toast} from "@/components/ui/use-toast"



export default function UserFeedPage() {
  const [isSubmitting, setisSubmitting] = useState(false)
  const params = useParams();
  const { username } = params;

  const form = useForm<z.infer<typeof MessageSchemaValidation>>({
    resolver: zodResolver(MessageSchemaValidation),
    defaultValues: {
      title: "",
      content: ""
    }
  });

  async function onSubmit(data: z.infer<typeof MessageSchemaValidation>) {
     try{
      setisSubmitting(true)
      data.username = username;
      const res = await axios.post("/api/send-message",data)
      toast({
         title:"success",
         description:res.data.message
      })
     }catch(error:any){
        console.error("Error submitting feedback:", error);
        toast({
         title:"failure",
         description:error.response.data.message,
         variant:"destructive"
      })
     }finally{
        setisSubmitting(false)
     }
   }
  

  return (
    <section className="relative py-20 px-8 overflow-hidden bg-transparent">
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          Give Your Feedback to {username}
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          We value your feedback! Help us improve by sharing your thoughts with{" "}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-pink-500 rounded-md -skew-y-3"></span>
            <span className="relative">{username}</span>
          </span>
          . Your input is crucial in helping us create better experiences for{" "}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-purple-500 rounded-md -skew-y-3"></span>
            <span className="relative">everyone</span>
          </span>
          .
        </p>
      </div>
      <div className="max-w-[650px] mt-5 w-full mx-auto ">
        <div className="w-full mt-5 flex flex-col items-stretch p-2 space-y-8">
       <h1 className="font-semibold text-2xl text-start">Leave Feedback</h1>
          <Form {...form} className="w-full">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content" // Make sure this matches the schema field
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Content"
                        {...field}
                        rows={6}
                        className="resize-none whitespace-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="ml-2">
                {isSubmitting ? (
                  <span className="flex justify-around items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Please wait...
                  </span>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
