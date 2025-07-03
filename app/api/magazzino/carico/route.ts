import { NextResponse } from "next/server";
import { caricaProdotto } from "@/lib/magazzino";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await caricaProdotto(body);
  return NextResponse.json(result);
}
