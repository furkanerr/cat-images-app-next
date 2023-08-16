import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized",
        errorMessage: "Kullanıcı adı veya şifre hatalı.",
      },
      {
        status: 401,
      }
    );
  }
  const key = process.env.KEY;

  const token = sign(
    {
      username,
    },
    key,
    {
      expiresIn: 10000,
    }
  );

  const seralized = serialize("COOKIE_NAME", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10000,
    path: "/",
  });

  const response = {
    message: "Authenticated",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
