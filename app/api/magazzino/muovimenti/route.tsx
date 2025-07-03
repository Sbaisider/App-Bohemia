import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const movimenti = await prisma.movimento.findMany({
    include: { prodotto: true },
    orderBy: { data: "desc" }
  });
  return NextResponse.json(movimenti);
}

export async function POST(request: Request) {
  const { prodottoId, quantita, tipo, descrizione } = await request.json();
  if (!prodottoId || !quantita || !tipo) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  // Aggiorna quantità prodotto
  const prodotto = await prisma.prodotto.findUnique({ where: { id: prodottoId } });
  if (!prodotto) return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 });

  let nuovaQuantita = prodotto.quantita;
  if (tipo === "carico_fornitore") nuovaQuantita += quantita;
  else if (tipo === "consumo" || tipo === "scarico_verso_bar") nuovaQuantita -= quantita;

  if (nuovaQuantita < 0) return NextResponse.json({ error: "Quantità negativa!" }, { status: 400 });

  await prisma.prodotto.update({
    where: { id: prodottoId },
    data: { quantita: nuovaQuantita }
  });

  // Registra movimento
  const movimento = await prisma.movimento.create({
    data: { prodottoId, quantita, tipo, descrizione }
  });

  return NextResponse.json(movimento);
}
