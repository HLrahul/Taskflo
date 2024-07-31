import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/add-task`,
      body,
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-task/${taskId}`,
      body,
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/delete-task/${taskId}`,
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
