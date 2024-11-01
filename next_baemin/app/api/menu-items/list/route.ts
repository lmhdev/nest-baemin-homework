import { nestRequest } from "@/utils/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const response = await nestRequest().get(
      `menu-items?page=${page}&limit=${limit}`
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
      },
      { status: error.statusCode || 500 }
    );
  }
}
