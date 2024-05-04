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
import { updateProfileValidation } from "@/validation/validation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { toast_for_signup } from "@/helper/errorhandling";
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Context } from "@/context/contextApi";

export default function VerifiedProfile() {
  const { setUsername, setUserId } = useContext(Context);
  const { toast } = useToast();
  const [cookies] = useCookies();
  const router = useRouter();

  const [first, setFirst] = useState(true);

  if (!first) {
    notFound();
  }
  useEffect(() => {
    axios
      .get("/api/verify")
      .then((response) => {
        if (response.data.message === "verified") {
          setUsername(response.data.username);
          setUserId(response.data.userId);
        }
        if (response.data.message === "Invalid User Id") {
          setFirst(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (cookies?.userId) {
      router.push(`/user/${cookies?.userId}`);
      setUsername(cookies?.username);
    }
  }, [cookies?.userId]);

  const onSubmit = async (values: z.infer<typeof updateProfileValidation>) => {
    axios
      .post("/api/updateprofile", { ...values, id: cookies?.userId })
      .then(function (response) {
        setUsername(response?.data?.username);
        toast_for_signup(response);
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
            description: "Server error try again with different credentials",
          });
        }
      });
  };

  const form = useForm<z.infer<typeof updateProfileValidation>>({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      username: cookies?.username,
      password: "",
    },
  });

  {
    if (first)
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  w-[350px] m-auto flex flex-col gap-4  rounded-md p-6 bg-white"
          >
            <h1 className="font-bold text-black text-2xl">
              Update Your Profile
            </h1>

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
              Update Profile
            </Button>
          </form>
        </Form>
      );
  }
}
