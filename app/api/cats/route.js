import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      {
        headers: {
          "x-api-key": process.env.API_KEY,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );

    return NextResponse.json({
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 400,
      }
    );
  }
}
