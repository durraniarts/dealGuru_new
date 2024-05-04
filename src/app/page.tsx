"use client";
import Sidebar from "@/components/sidebar";

import ContentCard from "@/components/contentCard";
import React, { useState, useEffect, useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [gotDeal, setDeals] = useState<any>();

  useEffect(() => {
    const updateViews = async () => {
      try {
        const response = await fetch("/api/getdeals", {
          next: { revalidate: 30 },
        });
        const d = await response.json();
        // console.log(d);
        setDeals(d);
        return response;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };
    updateViews();
  }, []);
  // console.log(gotDeal?.deals);
  return (
    <div className=" flex justify-between w-[100%] gap-6 ">
      <div className=" flex  flex-col gap-6 w-[100%]">
        {gotDeal?.deals[0] ? (
          gotDeal.deals.map((deal: any, index: any) => (
            <ContentCard deal={deal} key={index} />
          ))
        ) : (
          <>
            <div className="space-y-4 bg-white p-6 rounded-xl">
              <Skeleton className="w-3/4 h-[50px]" />
              <Skeleton className="w-1/2 h-[30px]" />
              <Skeleton className="w-1/4 h-[20px]" />
            </div>
            <div className="space-y-4 bg-white p-6 rounded-xl">
              <Skeleton className="w-3/4 h-[50px]" />
              <Skeleton className="w-1/2 h-[30px]" />
              <Skeleton className="w-1/4 h-[20px]" />
            </div>
            <div className="space-y-4 bg-white p-6 rounded-xl">
              <Skeleton className="w-3/4 h-[50px]" />
              <Skeleton className="w-1/2 h-[30px]" />
              <Skeleton className="w-1/4 h-[20px]" />
            </div>
          </>
        )}
      </div>{" "}
      <Sidebar />
    </div>
  );
};

export default Home;
