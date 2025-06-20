import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await prisma.prodotto.create({ data: body });
  return NextResponse.json(result);
}

export async function GET() {
  const prodotti = await prisma.prodotto.findMany();
  return NextResponse.json(prodotti);
}
