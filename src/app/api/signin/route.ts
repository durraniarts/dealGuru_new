import connect from "@/db/dbConfig";
import User from "@/db/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    let dbResponse = await connect();

    let findUser = await User.findOne({ email: email }).exec();

    if (findUser === null) {
      return NextResponse.json({ message: "Email not found" });
    } else if (findUser !== null) {
      const existed = await bcrypt.compare(password, findUser?._doc?.password);
      if (!existed) {
        return NextResponse.json({ message: "Invalid Password" });
      } else {
        const userId = findUser._doc._id.toString();
        const username = findUser.username;

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
        NextResponse.redirect(new URL(`/user/${userId}`, request.url));
        return NextResponse.json({ message: "done", userId, username });
      }
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
