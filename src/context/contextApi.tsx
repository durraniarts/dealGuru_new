"use client";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext<any | null>(null);

export const Wrapper = ({ children }: any) => {
  const [isVerified, setIsVerified] = useState(false);
  const [usernameUpdated, setUsername] = useState("");
  const [verifiedId, setUserId] = useState("");
  const [updated, setIsUpdated] = useState(false);
  useEffect(() => {
    axios
      .get("/api/verify")
      .then((response) => {
        if (response.data.message === "verified") {
          setUsername(response.data.username);
          setUserId(response.data.userId);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Context.Provider
      value={{
        isVerified,
        setIsVerified,
        usernameUpdated,
        setUsername,
        setIsUpdated,
        updated,
      }}
    >
      <Navbar />
      <div className="px-16 pt-32 pb-6">{children}</div>
      <Toaster />
    </Context.Provider>
  );
};
