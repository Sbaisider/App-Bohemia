import { NextResponse } from "next/server";
import { scaricaProdotto } from "@/lib/magazzino";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await scaricaProdotto(body);
  return NextResponse.json(result);
}
