import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        email: body.email,
        password: body.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resJson = response.data;

    if (response.status === 200) {
      cookies().set("refreshToken", resJson.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      cookies().set("accessToken", resJson.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
      });

      delete resJson.accessToken;
      delete resJson.refreshToken;
    }

    return new NextResponse(JSON.stringify(resJson), { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new NextResponse(JSON.stringify(error.response.data), { status: error.response.status });
    }

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}