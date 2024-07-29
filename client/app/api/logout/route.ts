import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Remove the accessToken and refreshToken cookies
    cookies().set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1, // Set maxAge to -1 to delete the cookie
    });
    cookies().set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1, // Set maxAge to -1 to delete the cookie
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Logout successful",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
