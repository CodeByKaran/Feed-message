"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserSchemaValidation } from "../../zod/user.zod.ts";
import { Button } from "@/components/ui/button";
import { useDebounceCallback } from "usehooks-ts";
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
import axios from "axios";
import {useRouter} from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import {Loader2} from "lucide-react"



function SignUp() {
  const [username, setUsername] = useState("");
  const [usernameResMessage, setUsernameResMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserSchemaValidation>>({
    resolver: zodResolver(UserSchemaValidation),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: ""
    }
  });

  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof UserSchemaValidation>) {
  try {
    setIsSubmitting(true);
    const res = await axios.post("/api/sign-up", values);

    if (res.data.success) {
      toast({
        title: "Success",
        description: res.data?.message,
      });
      router.replace(`/verify/${values.username}`);
      setUsernameResMessage("");
      setUsername("");
    } else {
      toast({
        title: "Failure",
        description: res.data?.message,
        variant:"destructive"
      });
    }
  } catch (error) {
    toast({
      title: "Failure",
      description: error.response?.data?.message || "An error occurred.",
      variant:"destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
}


  useEffect(() => {
    const checkUsername = async () => {
      try {
        if (username) {
          setIsCheckingUsername(true);
          setUsernameResMessage("");
          const { data } = await axios.get(
            `/api/username-check?username=${username}`
          );
          setUsernameResMessage(data?.message || "Username check failed.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        setUsernameResMessage(errorMessage);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsername();
  }, [username]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen my-3">
      <div className="w-[90%] sm:w-[90%] md:w-[75%] h-fit p-6 mx-auto border border-gray-500/30 rounded-2xl shadow-lg ">
      <div className="w-full text-center mb-9">
        <h1 className="font-extrabold text-4xl lg:text-5xl text-center tracking-tighter">
            Feed Message
        </h1>
        <p className="text-base mt-1 ">Create a account to statrt journey of feeds.</p>
       </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FullName</FormLabel>
                  <FormControl>
                    <Input placeholder="fullname" {...field} />
                  </FormControl>
                  <FormDescription>Enter your fullname</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      value={field.value}
                      onChange={e => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <p
                    className={`text-sm ${usernameResMessage==="Username is unique"?"text-green-500":"text-red-500"}`}
                  >
                    {" "}                    {usernameResMessage}
                  </p>
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Verification code will be sent to email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="avatar"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter the password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ?(<>
              <span className="flex justify-around items-center">
               <Loader2 className="w-4 h-4 animate-spin mr-2"/>
              please wait...
             </span>
              </>): "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          <Link href="/sign-in" className=" text-sm ">
            Already have an account?{" "}
            <strong className="text-sm text-blue-900">Sign in</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
