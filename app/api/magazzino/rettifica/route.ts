import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { prodottoId, quantita } = await request.json();
  if (!prodottoId || quantita == null) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }
  const prodotto = await prisma.prodotto.findUnique({ where: { id: prodottoId } });
  if (!prodotto) return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 });
  await prisma.prodotto.update({
    where: { id: prodottoId },
    data: { quantita: quantita }
  });
  await prisma.movimento.create({
    data: {
      prodottoId,
      quantita,
      tipo: "rettifica",
      descrizione: "Aggiornamento manuale (fine serata)"
    }
  });
  return NextResponse.json({ ok: true });
}
