import { nestRequest } from "@/utils/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const id = searchParams.get("id");
    const response = await nestRequest().get(`menus/restaurant/${id}`);
    return NextResponse.json({ data: response.data });
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
