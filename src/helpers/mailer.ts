import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/src/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const idString = typeof userId === "string" ? userId : String(userId);
    const hashedToken = await bcrypt.hash(idString, 10);

    console.log("in email");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c324a60bf704f2",
        pass: "c1651156b25196",
      },
    });

    const verifyMailOptions = {
      from: "satjeet2005@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Reset your password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const resetMailOptions = {
      from: "satjeet2005@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Reset your password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/forgotpassword?token=${hashedToken}>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    if (emailType === "VERIFY") {
      const mailresponse = await transporter.sendMail(verifyMailOptions);
      console.log(mailresponse.response);
    } else if (emailType === "RESET") {
      const mailresponse = await transporter.sendMail(resetMailOptions);
      console.log(mailresponse.response);
    }

  } catch (e: any) {
    throw new Error(e.message);
  }
};
