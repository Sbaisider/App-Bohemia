import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const movimenti = await prisma.movimento.findMany({
    include: { prodotto: { include: { magazzino: true } } },
    orderBy: { data: "desc" }
  });
  // Formatta i dati per la tabella frontend
  const arr = movimenti.map(m => ({
    magazzinoNome: m.prodotto.magazzino.nome,
    prodottoNome: m.prodotto.nome,
    tipo: m.tipo,
    quantita: m.quantita,
    descrizione: m.descrizione,
    data: m.data
  }));
  return NextResponse.json(arr);
}
