import { NextResponse } from "next/server";
import { getStorico } from "@/lib/magazzino";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const zona = searchParams.get("zona") || "MAGAZZINO";
  const result = await getStorico(zona);
  return NextResponse.json(result);
}
