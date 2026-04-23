import { sendVerificationToken } from "@/lib/sendVerificationtoken";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST() {
  try {
     await sendVerificationToken("krishprajapati569@gmail.com", "abc");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

