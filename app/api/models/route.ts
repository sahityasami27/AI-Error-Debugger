import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await res.json();

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch models",
      },
      {
        status: 500,
      }
    );
  }
}