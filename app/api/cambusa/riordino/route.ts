import { NextResponse } from "next/server";
import { richiediRiordino } from "@/lib/cambusa";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await richiediRiordino(body);
  return NextResponse.json(result);
}
