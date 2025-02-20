/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "../../utils/supabase";

export async function POST(request: Request) {
  try {
    const {
      data: {
        object: { name, email },
      },
    } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    const { data } = await supabase.from("users").select().eq("email", email);

    if (data && data.length > 0) {
      return NextResponse.json(
        { error: "User already exists in database" },
        { status: 500 }
      );
    } else {
      await supabase.from("users").insert([
        {
          name: name,
          email: email,
        },
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in sendMessage API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
