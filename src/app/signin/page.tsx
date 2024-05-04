"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/validation/validation";
import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { toast_for_signin } from "@/helper/errorhandling";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/context/contextApi";

export default function SignIn() {
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

  const onSubmit = async (values: z.infer<typeof signInValidation>) => {
    axios
      .post("/api/signin", values)
      .then(function (response) {
        toast_for_signin(response);
        if (response && response.data?.userId) {
          console.log(response.data);
          updateContext();
        }
      })
      .catch(function (error) {
        console.log(error);
        toast({ title: "Error Try again" });
      });
  };

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
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
        <h1 className="font-bold text-black text-2xl">SignIn</h1>
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
          Login
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="font-semibold " href={"/signup"}>
            Signup here
          </Link>
        </p>
      </form>
    </Form>
  );
}
