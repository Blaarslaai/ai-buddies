import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract URL query parameters
  const { searchParams } = new URL(request.url);
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Transaction reference is missing" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: `Received trxref: ${trxref}, reference: ${reference}`,
  });
}
