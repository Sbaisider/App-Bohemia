import { NextResponse } from "next/server";
import { registraConsumazione } from "@/lib/tavoli";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await registraConsumazione(body);
  return NextResponse.json(result);
}
