import { toast } from "@/components/ui/use-toast";

export function toast_for_signup(response: any) {
  let status: any = response.data.message.code;
  switch (status) {
    case 11000:
      toast({
        variant: "destructive",
        title: "Email or username already registered.",
        description: "Try again by changing email or username",
      });
      break;
  }

  switch (response.data.message) {
    case "done":
      toast({
        variant: "default",
        title: "Successfully Registered ✅",
      });
      break;
  }
}

export function toast_for_signin(response: any) {
  let status: any = response.data.message;
  switch (status) {
    case "Email not found":
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Try again by changing Email",
      });
      break;
    case "Invalid Password":
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Try again by changing Password",
      });
      break;
  }

  switch (response.data.message) {
    case "done":
      toast({
        variant: "default",
        title: "Successfully Registered ✅",
      });
      break;
  }
}
