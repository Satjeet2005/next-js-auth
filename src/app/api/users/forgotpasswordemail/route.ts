import { extractJWT } from "@/src/helpers/extractJWT";
import { sendEmail } from "@/src/helpers/mailer";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const decodedJWT = await extractJWT(request);
    console.log(decodedJWT);

    const user = await User.findById(decodedJWT);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: decodedJWT,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
