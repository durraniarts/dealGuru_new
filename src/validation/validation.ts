import { z } from "zod";

export const dealValidation = z.object({
  title: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  image: z
    .string()
    .email({
      message: "Please Enter your Email",
    })
    .min(10),
  price: z.string().min(4, {
    message: "Please Enter at least 4 characters",
  }),
});

export const registerValidation = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please Enter your Email",
    })
    .min(10),
  password: z.string().min(4, {
    message: "Please Enter at least 4 characters",
  }),
});
export const signInValidation = z.object({
  email: z
    .string()
    .email({
      message: "Please Enter your Email",
    })
    .min(10),
  password: z.string().min(4, {
    message: "Please Enter at least 4 characters",
  }),
});
export const updateProfileValidation = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z
    .string()
    .min(4, {
      message: "Please Enter at least 4 characters",
    })
    .optional(),
});
