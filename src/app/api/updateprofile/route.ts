import connect from "@/db/dbConfig";
import User from "@/db/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { id, username, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 7);

  try {
    let dbResponse = await connect();
    console.log(dbResponse);

    let updateUser = await User.findOneAndUpdate(
      { _id: id },
      { username: username, password: hashedPassword }
    ).exec();
    console.log(updateUser);
    const findUser = await User.findOne({ _id: id }).exec();
    console.log(findUser);

    if (updateUser === null) {
      return NextResponse.json({ message: "Invalid User ID not found" });
    }
    const userId = findUser._doc._id.toString();
    const updatedUsername = findUser.username;

    cookies().set({
      name: "userId",
      value: userId,
      path: "/",
    });

    cookies().set({
      name: "username",
      value: updatedUsername,
      path: "/",
    });

    NextResponse.redirect(new URL(`/user/${userId}`, request.url));
    return NextResponse.json({ message: "done", userId, username });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
