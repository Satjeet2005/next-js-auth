import { extractJWT } from "@/src/helpers/extractJWT";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import connect from "@/db/config";
import { constants } from "buffer";

connect();
export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
        verifyToken: token
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.verifyTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Token is expiried" }, { status: 401 });
    }

    if (user.verifyToken !== token) {
      return NextResponse.json({ error: "incorrect token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified", status: 200 });
  } catch (e:any) {
    return NextResponse.json(
      { error: e.message },
      { status: 400 }
    );
  }
};
