import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import User from "@/db/model/userModel";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const token = cookies().get("userId")?.value;

    const isValid = await User.findById({ _id: token });

    if (isValid !== null || isValid !== undefined || isValid !== false) {
      const userId = isValid?._doc?._id;
      const username = isValid?._doc?.username;

      cookies().set({
        name: "userId",
        value: userId,
        path: "/",
      });

      cookies().set({
        name: "username",
        value: username,
        path: "/",
      });

      return NextResponse.json({ message: "verified", userId, username });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Invalid User Id" }, { status: 200 });
  }
}
