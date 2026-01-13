import connect from "@/db/config";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { error } from "console";
import jwt from "jsonwebtoken";
import { PowerSquare } from "lucide-react";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    console.log(user);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "either email or password is wrong" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!);

    const response = NextResponse.json({
      message: "loggedin successfully",
      status: 200,
    });

    response.cookies.set("token", token, { httpOnly: true });


    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
