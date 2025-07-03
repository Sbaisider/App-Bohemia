import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const nome = params.nome;
  const magazzino = await prisma.magazzino.findUnique({
    where: { nome },
    include: {
      prodotti: {
        include: {
          movimenti: true,
        },
      },
    },
  });
  if (!magazzino) return NextResponse.json([]);
  // Flatten all movimenti of all prodotti
  const allMovimenti = magazzino.prodotti.flatMap(p =>
    p.movimenti.map(m => ({
      ...m,
      prodotto: { nome: p.nome }
    }))
  );
  // Ordina per data discendente
  allMovimenti.sort((a, b) => b.data.localeCompare(a.data));
  return NextResponse.json(allMovimenti);
}
