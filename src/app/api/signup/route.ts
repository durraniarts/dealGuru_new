import connect from "@/db/dbConfig";
import User from "@/db/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 7);

  try {
    let dbResponse = await connect();

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    let userCreated = await newUser.save();
    let userId = userCreated._id.toString();
    let newUsername = userCreated.username;

    cookies().set({
      name: "userId",
      value: userId,
      path: "/",
    });

    cookies().set({
      name: "username",
      value: newUsername,
      path: "/",
    });

    NextResponse.redirect(new URL(`/user/${userId}`, request.url));
    return NextResponse.json({ message: "done", userCreated });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error.code === 11000 ? 11000 : error.message },
      { status: 500 }
    );
  }
}
