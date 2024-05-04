import connect from "@/db/dbConfig";
import { NextResponse } from "next/server";

import Deal from "@/db/model/dealModel";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  try {
    let dbResponse = await connect();

    let deals = await Deal.find({}).exec();

    if (!deals || deals === null) {
      return NextResponse.json({ message: "No deal found" });
    } else if (deals !== null) {
      console.log(deals);
      return NextResponse.json({ message: "done", deals });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
