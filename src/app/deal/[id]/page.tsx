"use client";
import DealDetails from "@/components/dealDetails";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

import React, { useEffect, useState } from "react";

const DealCard = ({ params }: any) => {
  const [dealData, setDealData] = useState<any | undefined>();
  console.log(params.id);
  useEffect(() => {
    axios
      .post("/api/dealdetails", { id: params.id })
      .then((data) => {
        console.log("API Response:", data.data.deal);
        setDealData(data.data.deal);
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
      });
  }, []);
  return dealData ? (
    <>
      <DealDetails deal_details={dealData} />
    </>
  ) : (
    <div className="space-y-4 bg-white p-6 rounded-xl">
      <Skeleton className="w-3/4 h-[50px]" />
      <Skeleton className="w-1/2 h-[30px]" />
      <Skeleton className="w-1/4 h-[20px]" />
    </div>
  );
};

export default DealCard;
