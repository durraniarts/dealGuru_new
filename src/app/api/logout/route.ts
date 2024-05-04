"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  cookies().delete("userId");
  cookies().delete("username");
  return NextResponse.json({ message: "cookie removed" }, { status: 200 });
}
