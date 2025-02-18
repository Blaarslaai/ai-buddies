/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    // Parse the form data sent by Twilio
    const formData = await request.formData();
    const body = formData.get("Body") as string | null;
    const from = formData.get("From") as string | null;

    if (!body || !from) {
      return NextResponse.json(
        { error: "Missing message body or sender information." },
        { status: 400 }
      );
    }

    console.log(`Received message from ${from}: ${body}`);

    // Generate an AI response (replace this with your actual AI logic)
    const aiResponse = await generateAIResponse(body);

    // Send the AI response back to the sender using Twilio
    await sendWhatsAppMessage(from, aiResponse);

    // Respond to Twilio with a 200 status
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in incoming webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Dummy function to simulate generating an AI response.
// Replace this with your actual AI model integration.
async function generateAIResponse(userMessage: string): Promise<string> {
  return `You said: "${userMessage}". This is an AI response!`;
}

// Function to send a WhatsApp message via Twilio
async function sendWhatsAppMessage(to: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from) {
    console.error("Twilio configuration is missing in environment variables.");
    throw new Error("Twilio configuration error");
  }

  const client = twilio(accountSid, authToken);
  await client.messages.create({
    from: `whatsapp:${from}`,
    to: to, // Twilio sends the "From" field in the webhook. Use it directly.
    body: message,
  });
}
