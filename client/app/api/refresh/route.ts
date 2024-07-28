import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
      {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    const resJson = response.data;

    if (response.status === 200) {
      cookies().set("accessToken", resJson.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
      });
    }

    return new NextResponse(JSON.stringify(resJson), {
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new NextResponse(JSON.stringify(error.response.data), {
        status: error.response.status,
      });
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
