import connect from "@/db/config";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token, password, confirmPassword } = reqBody;
    console.log(reqBody);

    if (!token) {
      return NextResponse.json({ error: "token is missing" }, { status: 400 });
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        {
          error:
            "Password and confirm password both are required for changing password",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Token is expired" }, { status: 400 });
    }

    if (user.forgotPasswordToken !== token) {
      return NextResponse.json({ error: "incorrect token" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords are not matching" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
    console.log(hashedPassword);

    return NextResponse.json({
      message: "Password changed successfully",
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
