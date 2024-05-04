import connect from "@/db/dbConfig";
import { NextResponse } from "next/server";

import Deal from "@/db/model/dealModel";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  try {
    let dbResponse = await connect();

    let deal = await Deal.findById(res.id).exec();
    return NextResponse.json({ message: "found", deal });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
