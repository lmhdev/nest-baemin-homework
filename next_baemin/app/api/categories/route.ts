import { nestRequest } from "@/utils/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await nestRequest().get("categories");
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
