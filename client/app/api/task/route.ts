import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        withCredentials: true,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/add-task`,
      body
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

export async function PUT(req: NextRequest & { query?: { taskId: string } }) {
  try {
    const body = await req.json();
    const { taskId } = req.query || {};

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-task/${taskId}`,
      body
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

export async function DELETE(req: NextRequest & { query?: { taskId: string } }) {
  try {
    const { taskId } = req.query || {};

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/delete-task/${taskId}`
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
