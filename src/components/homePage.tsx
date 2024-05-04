"use client";
import ContentCard from "@/components/contentCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
// import { createTodo } from "@/app/actions";

const HomePage = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const updateViews = async () => {
      // const updatedViews = await createTodo();
      // console.log(updatedViews);
      //  setViews(updatedViews);
    };

    updateViews();
  }, []);

  return (
    <div className=" flex  flex-col gap-6 w-[100%]">
      {deals[0] ? (
        deals.map((deal, index) => <ContentCard deal={deal} key={index} />)
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
    </div>
  );
};

export default HomePage;
