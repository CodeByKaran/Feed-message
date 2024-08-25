"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserSignInValidation } from "../../zod/user.zod.ts";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserSignInValidation>>({
    resolver: zodResolver(UserSignInValidation),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Submit handler for the form
  async function onSubmit(values: z.infer<typeof UserSignInValidation>) {
    setIsSubmitting(true);
    
   try {
      const result = await signIn("credentials", {
         redirect:false,
        ...values
      });
      if (result?.error) {
        toast({
          title: "Failure",
          description: "incorrect credentials",
          variant:"destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully logged in"
        });
        router.replace("/dashboard");
      }
    } catch (e:any) {
      toast({
        title: "Failure",
        description: "Something went wrong",
        variant:"destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[100vh] my-2">
      <div className="w-[90%] sm:w-[90%] md:w-[75%] h-fit p-6 mx-auto border border-gray-500/30 rounded-2xl shadow-lg">
        <div className="w-full text-center mb-9">
          <h1 className="font-extrabold text-4xl lg:text-5xl text-center tracking-tighter">
            Feed Message
          </h1>
          <p className="text-base mt-1">Have a good feed days</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email" // Make sure this matches the schema field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password" // Make sure this matches the schema field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex justify-around items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Please wait...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <Link href="/sign-up" className="text-sm">
            Don't have an account?{" "}
            <strong className="text-sm text-blue-900">Sign Up</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
