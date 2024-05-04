"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerValidation } from "@/validation/validation";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { toast_for_signup } from "@/helper/errorhandling";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/context/contextApi";

export default function Register() {
  const { setIsVerified, setUsername } = useContext(Context);
  const { toast } = useToast();
  const [cookies] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies?.userId) {
      router.push(`/user/${cookies?.userId}`);
      setUsername(cookies?.username);
    }
  }, [cookies?.userId]);

  function updateContext() {
    setIsVerified(true);
  }

  const onSubmit = async (values: z.infer<typeof registerValidation>) => {
    axios
      .post("/api/signup", values)
      .then(function (response) {
        console.log(response);
        toast_for_signup(response);
        if (response && response?.data?.userCreated?._id) {
          updateContext();
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error?.response?.data?.message === 11000) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Credential existed try to change username or email",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Server error try again later",
          });
        }
      });
  };

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  w-[350px] m-auto flex flex-col gap-4 border border-black rounded-md p-6 bg-white"
      >
        <h1 className="font-bold text-black text-2xl">Sign Up</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} type="email" />
              </FormControl>

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
                <Input placeholder="Username" {...field} type="text" />
              </FormControl>
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
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-bg_color" type="submit">
          Register
        </Button>
        <p className="text-sm text-center text-gray-600">
          Already Registered?{" "}
          <Link className="font-semibold" href={"/signin"}>
            Login here
          </Link>
        </p>
      </form>
    </Form>
  );
}
