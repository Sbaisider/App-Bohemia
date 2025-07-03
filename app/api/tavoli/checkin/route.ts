import { NextResponse } from "next/server";
import { checkinCliente } from "@/lib/tavoli";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await checkinCliente(body);
  return NextResponse.json(result);
}
