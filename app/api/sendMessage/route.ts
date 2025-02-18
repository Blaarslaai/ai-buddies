/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return NextResponse.json(
        { error: "Missing phone or message" },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_NUMBER;

    // Check if environment variables are missing
    if (!accountSid || !authToken || !from) {
      console.error("Missing environment variables for Twilio configuration");
      return NextResponse.json(
        { error: "Twilio configuration is missing." },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const response = await client.messages.create({
      from: `whatsapp:${from}`,
      to: `whatsapp:${phone}`,
      body: message,
    });

    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error: any) {
    console.error("Error in sendMessage API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
