import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const nome = params.nome;
  const magazzino = await prisma.magazzino.findUnique({
    where: { nome },
    include: { prodotti: true }
  });
  if (!magazzino) return NextResponse.json([]);
  return NextResponse.json(magazzino.prodotti);
}
