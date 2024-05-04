"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "./dropDown";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { Context } from "@/context/contextApi";
import { AddDeal } from "./addDealSidebar";

const Navbar = () => {
  const path = usePathname();
  const [userId, setUserId] = useState<any>();
  const [cookies] = useCookies(["userId"]);
  const { usernameUpdated } = useContext(Context);

  useEffect(() => {
    setUserId(cookies?.userId);
  }, [path]);

  return (
    <div className="bg-white px-14   py-4 justify-between flex items-center fixed w-full shadow-xl shadow-gray-500 z-20">
      <Link href={"/"}>
        <Image
          priority={true}
          className="cursor-pointer aspect-auto bg-white  w-[150px] h-[30px]"
          alt="logo"
          src={"/logo.png"}
          width={150}
          height={10}
        />
      </Link>
      {usernameUpdated === "" ? (
        <div className="flex">
          <Link
            className=" border border-white px-4 py-2 rounded-md text-white font-normal text-sm bg-bg_color"
            href="/signin"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="flex gap-4  justify-center items-center">
          <div className="mr-6">
            <AddDeal />
          </div>
          <div className=" ">
            {" "}
            <p className=" text-black font-semibold text-base">
              {usernameUpdated}
            </p>
          </div>
          <Dropdown session={userId} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
