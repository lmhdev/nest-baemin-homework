import { nestRequest } from "@/utils/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const id = searchParams.get("id");
    const responseMenu = await nestRequest().get(`menus/restaurant/${id}`);
    const menuId = responseMenu.data[0].menu_id;
    const responseItems = await nestRequest().get(`menu-items/menu/${menuId}`);
    return NextResponse.json({ data: responseItems.data });
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
