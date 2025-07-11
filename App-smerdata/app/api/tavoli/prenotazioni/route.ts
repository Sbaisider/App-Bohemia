import { NextResponse } from "next/server";
import { creaPrenotazione } from "@/lib/tavoli";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await creaPrenotazione(body);
  return NextResponse.json(result);
}
