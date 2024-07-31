import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.get("cookie"),
        },
      }
    );

    return new NextResponse(JSON.stringify(response.data), {
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
