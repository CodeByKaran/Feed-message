"use client";

import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { verificationOtpSchemaValidation } from "../../../zod/user.zod";
import { Loader2 } from "lucide-react"; // Ensure you have the correct import path

const FormSchema = z.object({
  otp: verificationOtpSchemaValidation
});

function Verify() {
  const router = useRouter();
  const { username } = useParams();
  const [loading, setLoading] = useState(false); // Add loading state

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: ""
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true); // Start loading

    try {
      const response = await axios.post("/api/verify-user", {
        otp: data.otp,
        username
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
        });
        router.replace("/sign-in");
      } else {
        toast({
          title: "Error",
          description: response.data.message || "An error occurred.",
        });
      }
    } catch (error:any) {
      console.error("Verification error:", error);
      toast({
        title: "Error",
        description: "Failed to verify. Please try again.",
      });
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen my-2">
      <div className="w-[90%] sm:w-[90%] md:w-auto max-w-md h-fit p-6 mx-auto border border-gray-500/30 rounded-2xl shadow-lg ">
        <div className="w-full text-center mb-9">
          <h1 className="font-extrabold text-4xl lg:text-5xl text-center tracking-tighter">
            Feed Message
          </h1>
          <p className="text-base mt-1">Continue to look your feed</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    OTP has been sent to your email and is valid for one hour.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Verify;
