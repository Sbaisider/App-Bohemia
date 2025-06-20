import { NextResponse } from "next/server";
import { getStoricoCambusa } from "@/lib/cambusa";

export async function GET() {
  const result = await getStoricoCambusa();
  return NextResponse.json(result);
}
