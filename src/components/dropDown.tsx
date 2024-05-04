"use client";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { useContext } from "react";
import { Context } from "@/context/contextApi";

export function Dropdown(prop: any) {
  const { setIsVerified, setUsername } = useContext(Context);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${prop.session}`);
  };

  function updateContext() {
    setIsVerified(true);
  }

  const logout = () => {
    axios
      .get("/api/logout")
      .then(function (response) {
        console.log(response);
        setUsername("");
        router.push("/signin");

        if (response && response.data?.message === "cookie removed") {
          console.log(response.data);
          updateContext();
        }
        toast({
          title: "Logged out successfully",
        });
      })
      .catch(function (error) {
        console.log(error);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Server error try again later",
        });
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full h-10 w-10 p-0 focus-visible:ring-0 bg-gray-600 ">
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-12">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
